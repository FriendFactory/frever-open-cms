import { call, put } from "redux-saga/effects";

import { getVideoList, GetVideoListParams, Video } from "features/video-moderation/services";
import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import {
    videoModerationListLoadedErrorAction,
    videoModerationListLoadedOkAction,
    videoModerationListLoadingAction
} from "../../actions";
import { updateHashtagOkAction } from "features/hashtag-moderation/store/actions";

export function* loadVideoListByParams(stage: string, params: GetVideoListParams) {
    try {
        yield put(videoModerationListLoadingAction({ stage, params }));

        const result: ResultWithCount<Video> = yield call(getVideoList, stage, params || {});

        yield put(
            videoModerationListLoadedOkAction({
                stage,
                params,
                result
            })
        );

        if (params.hashtag && result.data[0]) {
            const hashtag = result.data[0].hashtags.find((hashtag) => hashtag.name === params.hashtag);
            if (hashtag) {
                yield put(updateHashtagOkAction({ stage, result: hashtag }));
            }
        }
    } catch (e) {
        yield put(
            videoModerationListLoadedErrorAction({
                error: (e as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Video List. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
