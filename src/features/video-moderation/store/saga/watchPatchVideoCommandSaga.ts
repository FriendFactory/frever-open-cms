import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { getVideoDetails, patchVideo } from "../../services";
import {
    patchVideoCommandAction,
    videoModerationDetailsLoadedOkAction,
    videoModerationListLoadAction
} from "../actions";
import { COLD_START_URL, VIDEO_MODERATION_DETAILS_URL } from "urls";
import { VideoInfo } from "features/video-moderation/services/getVideoDetails";

export function* watchPatchVideoCommandSaga() {
    yield takeEvery(patchVideoCommandAction.TYPE, function* (action: typeof patchVideoCommandAction.typeOf.action) {
        try {
            yield call(patchVideo, action.stage, action.videoId, action.data);

            const urlMatch = VIDEO_MODERATION_DETAILS_URL.match(location, true);
            if (urlMatch.isMatched) {
                const result: VideoInfo = yield call(getVideoDetails, urlMatch.params.stage, urlMatch.params.id);

                yield put(
                    videoModerationDetailsLoadedOkAction({
                        stage: urlMatch.params.stage,
                        videoId: urlMatch.params.id,
                        result
                    })
                );
            }

            const coldStartUrlMatch = COLD_START_URL.match(location, true);
            if (coldStartUrlMatch.isMatched) {
                yield put(
                    videoModerationListLoadAction({
                        stage: coldStartUrlMatch.params.stage,
                        params: { isStartListItem: "true", ...coldStartUrlMatch.query }
                    })
                );
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to PATCH. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
