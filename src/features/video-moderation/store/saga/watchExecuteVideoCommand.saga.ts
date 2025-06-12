import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { executeVideoCommand, getVideoDetails } from "../../services";
import { executeVideoCommandAction, videoModerationDetailsLoadedOkAction } from "../actions";
import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { VideoInfo } from "features/video-moderation/services/getVideoDetails";

export function* watchExcuteVideoCommandSaga() {
    yield takeEvery(executeVideoCommandAction.TYPE, function* (action: typeof executeVideoCommandAction.typeOf.action) {
        try {
            yield call(executeVideoCommand, action.stage, action.video, action.command);

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
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to ${action.command}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
