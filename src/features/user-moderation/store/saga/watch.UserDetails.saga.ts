import { call, fork, put, select, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getUserInfo, GetUserInfoParams, getUserProfileKPI, User, UserProfileKPI } from "../../services";
import { USER_DETAILS_BASE_URL, USER_DETAILS_INFO_URL } from "urls";
import { userDetailsLoadingAction, userDetailsLoadedOkAction, userDetailsLoadedErrorAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { userDetailsPageSelector } from "../reducer/user/userDetailsReducer";
import { AppState } from "app-state";
import { checkUserAccess } from "shared/checkUserAccess";
import { loadCrewsList } from "features/crews-moderation/store/saga/watchCrewsListSaga";

export function* watchUserDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_DETAILS_INFO_URL.match(action.payload.location, true);

        if (urlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            yield* loadUserDetails(urlMatch.params);

            const appState: AppState = yield select();
            const userData = userDetailsPageSelector(urlMatch.params)(appState);

            yield spawn(loadCrewsList, urlMatch.params.stage, { member: userData.data?.mainGroupId });

            return;
        }

        const baseUrlMatch = USER_DETAILS_BASE_URL.match(action.payload.location);

        if (baseUrlMatch.isMatched) {
            const hasAccess: boolean = yield call(checkUserAccess, "Social");
            if (!hasAccess) return;

            const appState: AppState = yield select();
            const userData = userDetailsPageSelector(baseUrlMatch.params)(appState);

            if (!userData.data && !userData.loading) {
                yield fork(loadUserDetails, baseUrlMatch.params);
            }
        }
    });
}

export function* loadUserDetails(params: GetUserInfoParams) {
    try {
        yield put(userDetailsLoadingAction(params));

        const result: User = yield call(getUserInfo, params);

        try {
            const userProfileKPI: UserProfileKPI = yield call(getUserProfileKPI, params.stage, result.mainGroupId);
            result.userProfileKPI = userProfileKPI;
        } catch (e) {}

        yield put(
            userDetailsLoadedOkAction({
                ...params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            userDetailsLoadedErrorAction({
                error: (responseError as Error).toString(),
                ...params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load user details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
