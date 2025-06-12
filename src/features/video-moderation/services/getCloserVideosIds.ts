import qs from "query-string";

import { request } from "shared";
import { createVideoListQuery, GetVideoListParams } from "./getVideoList";

export interface CloserVideosIds {
    nextVideoId: number | undefined;
    prevVideoId: number | undefined;
}

export async function getCloserVideosIds(
    stage: string,
    videoId: number,

    params: GetVideoListParams
): Promise<CloserVideosIds> {
    const baseQuery = createVideoListQuery(params);

    const queryForNext = {
        ...baseQuery,
        $orderBy: "id asc",
        $filter: baseQuery.$filter ? baseQuery.$filter + ` and id gt ${videoId}` : `id gt ${videoId}`,
        $top: 1
    };

    const queryForPrev = {
        ...baseQuery,
        $orderBy: "id desc",
        $filter: baseQuery.$filter ? baseQuery.$filter + ` and id lt ${videoId}` : `id lt ${videoId}`,
        $top: 1
    };

    const responseForNextVideo = await request(stage)
        .assetmanager()
        .get<{ data: [{ id: number }] }>(`/api/video/moderation?${qs.stringify(queryForNext)}`);

    const responseForPrevVideo = await request(stage)
        .assetmanager()
        .get<{ data: [{ id: number }] }>(`/api/video/moderation?${qs.stringify(queryForPrev)}`);

    if (responseForNextVideo.status && responseForPrevVideo.status) {
        const nextVideoId = responseForNextVideo.status === 200 ? responseForNextVideo.data.data[0]?.id : undefined;
        const prevVideoId = responseForPrevVideo.status === 200 ? responseForPrevVideo.data.data[0]?.id : undefined;

        return { nextVideoId, prevVideoId };
    }

    throw new Error("Error requesting video list");
}
