import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, all, put, takeEvery, spawn } from "redux-saga/effects";
import { addPopUpMessageAction } from "shared/store";

import { getUserList, GetUserListParams, User } from "../../services";
import { getUserProfileKPI, UserProfileKPI } from "../../services";
import { USER_MODERATION_LIST_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    userListLoadingAction,
    userListWithKPILoadingAction,
    userListLoadedOkAction,
    userListLoadedErrorAction,
    userListLoadAction
} from "../actions";

export function* watchUserListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_MODERATION_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadUserList, urlMatch.params.stage, urlMatch.query || {}, true);
    });

    yield takeEvery(userListLoadAction.TYPE, function* (action: typeof userListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadUserList, action.stage, action.params, action.withKPI);
    });
}

function* loadUserList(stage: string, params: GetUserListParams, withKPI?: boolean) {
    try {
        yield put(userListLoadingAction({ stage, params }));

        const userList: User[] = yield call(getUserList, stage, params);

        yield put(
            userListLoadedOkAction({
                stage,
                params,
                result: userList
            })
        );

        if (withKPI) {
            yield put(userListWithKPILoadingAction({ stage, params }));

            const result: User[] = yield all(
                userList.map(function* (user: User) {
                    try {
                        const userProfileKPI: UserProfileKPI = yield call(getUserProfileKPI, stage, user.mainGroupId);
                        return { ...user, userProfileKPI };
                    } catch (e) {
                        return user;
                    }
                })
            );

            yield put(
                userListLoadedOkAction({
                    stage,
                    params,
                    result
                })
            );
        }
    } catch (responseError) {
        yield put(
            userListLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the user list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
