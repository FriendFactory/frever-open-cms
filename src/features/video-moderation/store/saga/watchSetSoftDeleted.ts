import { setSoftDeletedVideo } from "features/video-moderation/services";
import { VideoInfo } from "features/video-moderation/services/getVideoDetails";
import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import {
    setVideoSoftDeleteAction,
    videoModerationDetailsLoadedErrorAction,
    videoModerationDetailsLoadedOkAction,
    videoModerationDetailsLoadingAction
} from "../actions";

export function* watchSetVideoSoftDeleted() {
    yield takeEvery(setVideoSoftDeleteAction.TYPE, function* (action: typeof setVideoSoftDeleteAction.typeOf.action) {
        const params = { stage: action.stage, videoId: action.videoId };

        try {
            yield put(videoModerationDetailsLoadingAction(params));

            const result: VideoInfo = yield call(
                setSoftDeletedVideo,
                action.stage,
                action.videoId,
                action.isDeleted,
                action.includeRemixes
            );

            yield put(
                videoModerationDetailsLoadedOkAction({
                    ...params,
                    result
                })
            );
        } catch (e) {
            yield put(
                videoModerationDetailsLoadedErrorAction({
                    error: (e as Error).toString(),
                    ...params
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to Soft Delete. ${(e as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
