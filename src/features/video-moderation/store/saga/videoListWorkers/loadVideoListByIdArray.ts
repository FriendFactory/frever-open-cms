import { call, all, put } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { getVideoList, GetVideoListParams, Video } from "features/video-moderation/services";
import { videoModerationListLoadedOkAction, videoModerationListLoadingAction } from "../../actions";
import { addPopUpMessageAction } from "shared/store";

export function* loadVideoListByIdArray(stage: string, params: GetVideoListParams) {
    if (typeof params.video === "string" || !params.video) {
        return;
    }

    const loadMap = params.video.map(function* (el) {
        try {
            const result: ResultWithCount<Video> = yield call(getVideoList, stage, { ...params, video: el });

            return result.data[0];
        } catch (e) {
            return;
        }
    });

    yield put(videoModerationListLoadingAction({ stage, params }));

    const result: Video[] = yield all(loadMap);

    if (result.some((el) => el === undefined)) {
        yield put(
            addPopUpMessageAction({
                messageText: `Some videos by ID from an array are not exist`,
                messageStyle: "info"
            })
        );
    }

    yield put(
        videoModerationListLoadedOkAction({
            stage,
            params,
            result: { data: result.filter(Boolean), count: params.video.length }
        })
    );
}
