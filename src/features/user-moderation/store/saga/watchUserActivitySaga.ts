import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery, spawn } from "redux-saga/effects";

import { USER_ACTIVITY_TAB_URL } from "urls";
import { ResultWithCount } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";
import { getUserActivity, UserActivityQueryParams, UserActivity } from "../../services";
import { userActivityLoadingAction, userActivityLoadedOkAction, userActivityLoadedErrorAction } from "../actions";

export function* watchUserActivitySaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_ACTIVITY_TAB_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadUserActivity, urlMatch.params.stage, urlMatch.params.id, urlMatch.query || {});
    });
}

function* loadUserActivity(stage: string, groupId: number, params: UserActivityQueryParams) {
    try {
        yield put(userActivityLoadingAction({ stage, groupId, params }));

        const result: ResultWithCount<UserActivity> = yield call(getUserActivity, stage, groupId, params);

        yield put(
            userActivityLoadedOkAction({
                stage,
                params,
                groupId,
                result
            })
        );
    } catch (responseError) {
        yield put(
            userActivityLoadedErrorAction({
                error: `Failed to load user activity. ${(responseError as Error).message}`,
                stage,
                groupId,
                params
            })
        );
    }
}
