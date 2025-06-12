import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { VIDEO_LEADERBOARD_LIST_URL } from "urls";
import {
    getVideoLeaderboardList,
    VideoLeaderboardQueryParams,
    LeaderboardVideo
} from "features/video-leaderboard/services";
import {
    videoLeadListLoadedErrorAction,
    videoLeadListLoadedOkAction,
    videoLeadListLoadingAction
} from "../actions/actions";

export function* watchVideoLeaderboardListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = VIDEO_LEADERBOARD_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadVideoLeaderboardList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadVideoLeaderboardList(stage: string, params: VideoLeaderboardQueryParams) {
    try {
        yield put(videoLeadListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<LeaderboardVideo> = yield call(getVideoLeaderboardList, stage, params);

        yield put(videoLeadListLoadedOkAction({ stage, params, data, total: count }));
    } catch (error) {
        yield put(
            videoLeadListLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the video leaderboard list. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
