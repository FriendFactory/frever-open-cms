import { all, call, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getUserList, getUserProfileKPI, User, UserProfileKPI } from "../../services";
import { USER_FOLLOWER_LIST_URL } from "urls";
import {
    userListLoadingAction,
    userListLoadedOkAction,
    userListLoadedErrorAction,
    userListWithKPILoadingAction
} from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchUserFollowerListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_FOLLOWER_LIST_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const params = {
            stage: urlMatch.params.stage,
            params: { ...urlMatch.query, [urlMatch.params.page]: urlMatch.params.id }
        };

        try {
            yield put(userListLoadingAction(params));

            const userList: User[] = yield call(getUserList, params.stage, params.params);

            yield put(
                userListLoadedOkAction({
                    ...params,
                    result: userList
                })
            );

            yield put(userListWithKPILoadingAction(params));

            const result: User[] = yield all(
                userList.map(function* (user: User) {
                    try {
                        const userProfileKPI: UserProfileKPI = yield call(
                            getUserProfileKPI,
                            urlMatch.params.stage,
                            user.mainGroupId
                        );

                        return { ...user, userProfileKPI };
                    } catch (e) {
                        return user;
                    }
                })
            );
            yield put(
                userListLoadedOkAction({
                    ...params,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                userListLoadedErrorAction({
                    ...params,
                    error: (responseError as Error).toString()
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the user ${urlMatch.params.page}. ${(
                        responseError as Error
                    ).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
