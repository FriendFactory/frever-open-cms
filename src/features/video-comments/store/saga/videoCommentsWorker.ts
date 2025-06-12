import { call, put } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { getVideoComments, VideoComment, VideoCommentsQueryParams } from "../../services";
import { videoCommentsLoadedErrorAction, videoCommentsLoadedOkAction, videoCommentsLoadingAction } from "../actions";

export function* videoCommentsWorker(stage: string, params: VideoCommentsQueryParams) {
    try {
        if (!params.videoId && !params.group) {
            throw new Error("Group/Video ID is required");
        }

        yield put(videoCommentsLoadingAction({ stage, params }));

        const result: ResultWithCount<VideoComment> = yield call(getVideoComments, stage, params);

        yield put(videoCommentsLoadedOkAction({ stage, params, result }));
    } catch (e) {
        yield put(videoCommentsLoadedErrorAction({ stage, params, error: (e as Error).toString() }));

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Video Comments. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
