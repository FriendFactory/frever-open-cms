import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { USER_LEADERBOARD_LIST_URL } from "urls";
import { UserSocialProfile } from "features/user-leaderboard/services";
import { addPopUpMessageAction } from "shared/store";
import { getLeaderboardList } from "../services";
import {
    leaderboardListLoadingAction,
    leaderboardListLoadedOkAction,
    leaderboardListLoadedErrorAction
} from "./actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchLeaderboardListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_LEADERBOARD_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage } = urlMatch.params;
        const params = urlMatch.query || {};

        try {
            yield put(leaderboardListLoadingAction({ stage, params }));

            const result: UserSocialProfile[] = yield call(getLeaderboardList, stage, params);

            yield put(
                leaderboardListLoadedOkAction({
                    stage,
                    params,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                leaderboardListLoadedErrorAction({
                    error: (responseError as Error).toString(),
                    stage,
                    params
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the leaderboard list. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
