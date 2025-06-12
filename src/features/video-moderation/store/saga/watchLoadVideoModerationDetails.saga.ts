import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { getVideoDetails, VideoInfo } from "features/video-moderation/services/getVideoDetails";
import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    closerVideosIdsAction,
    videoModerationDetailsLoadedErrorAction,
    videoModerationDetailsLoadedOkAction,
    videoModerationDetailsLoadingAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchLoadVideoModerationDetails() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = VIDEO_MODERATION_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        const actionParams = { stage: urlMatch.params.stage, videoId: urlMatch.params.id };

        try {
            yield put(videoModerationDetailsLoadingAction(actionParams));

            const result: VideoInfo = yield call(getVideoDetails, urlMatch.params.stage, urlMatch.params.id);

            yield put(
                closerVideosIdsAction({
                    stage: actionParams.stage,
                    videoId: actionParams.videoId,
                    params: urlMatch.query || {}
                })
            );

            yield put(
                videoModerationDetailsLoadedOkAction({
                    ...actionParams,
                    result
                })
            );
        } catch (e) {
            yield put(
                videoModerationDetailsLoadedErrorAction({
                    error: (e as Error).toString(),
                    ...actionParams
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the Video Details. ${(e as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
