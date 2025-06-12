import { call, put, takeEvery } from "redux-saga/effects";

import { CloserVideosIds, getCloserVideosIds } from "features/video-moderation/services/getCloserVideosIds";
import { closerVideosIdsAction, closerVideosIdsLoadedOkAction, closerVideosIdsLoadedErrorAction } from "../actions";
import { getVideoList, GetVideoListParams, Video } from "features/video-moderation/services";
import { ResultWithCount } from "shared";

export function* watchLoadCloserVideosIds() {
    yield takeEvery(closerVideosIdsAction.TYPE, function* (action: typeof closerVideosIdsAction.typeOf.action) {
        const { stage, videoId, params } = action;

        try {
            let result: CloserVideosIds;

            if (Array.isArray(params.video)) {
                const currentVideoIndex = params.video.indexOf(videoId.toString());

                const prev: number | undefined = yield loadCloserVideoFromIdList(
                    stage,
                    params,
                    currentVideoIndex,
                    params.video,
                    "prev"
                );

                const next: number | undefined = yield loadCloserVideoFromIdList(
                    stage,
                    params,
                    currentVideoIndex,
                    params.video,
                    "next"
                );

                result = { nextVideoId: next, prevVideoId: prev };
            } else {
                result = yield call(getCloserVideosIds, stage, videoId, params || {});
            }

            yield put(
                closerVideosIdsLoadedOkAction({
                    stage,
                    videoId,
                    params,
                    result
                })
            );
        } catch (e) {
            yield put(
                closerVideosIdsLoadedErrorAction({
                    error: (e as Error).toString(),
                    stage,
                    params,
                    videoId
                })
            );
        }
    });
}

export async function loadCloserVideoFromIdList(
    stage: string,
    query: GetVideoListParams,
    currentVideoIndex: number,
    videoList: string[],
    mode: "next" | "prev"
): Promise<number | undefined> {
    const nextVideoIndex = mode === "next" ? currentVideoIndex + 1 : currentVideoIndex - 1;

    const nextId = Number(videoList[nextVideoIndex]);

    let id;

    if (!isNaN(nextId)) {
        try {
            const result: ResultWithCount<Video> = await getVideoList(stage, { ...query, video: nextId.toString() });

            if (result.count > 0) {
                id = result.data[0].id;
            } else {
                throw new Error("");
            }
        } catch (e) {
            id = await loadCloserVideoFromIdList(stage, query, nextVideoIndex, videoList, mode);
        }
    }

    return id;
}
