import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE } from "urls";
import { LeaderboardVideo } from ".";
import { dateToODataFormat } from "utils";
import { LevelType } from "features/video-moderation";

export type VideoLeaderboardListOrderBy = "views" | "comments" | "likes" | "engagementRate";
export type VideoLeaderboardEditorTypes = "uploaded" | "studio" | "moments";

export interface VideoLeaderboardQueryParams extends BaseQueryParams {
    createdTime?: string;
    isFeatured?: "true" | "false";
    isDeleted?: "true" | "false" | "all";
    isPremiumMusic?: "true" | "false";
    access?: number;
    editor?: VideoLeaderboardEditorTypes;
    market?: string;

    orderBy?: VideoLeaderboardListOrderBy;
}

export async function getVideoLeaderboardList(
    stage: string,
    params: VideoLeaderboardQueryParams
): Promise<ResultWithCount<LeaderboardVideo>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE,
        $orderBy: `kpi/  ${params.orderBy ?? "engagementRate"} ${params.sortDirection ?? "desc"}`,
        access: params.access ?? 0
    };

    const filter = [];

    if (!params.isDeleted) filter.push("isDeleted eq false");

    if (params.market) filter.push(`country eq '${params.market}'`);

    if (params.isFeatured)
        filter.push(params.isFeatured === "true" ? `toplistPosition ne null` : "toplistPosition eq null");

    if (params.isDeleted && params.isDeleted !== "all") filter.push(`isDeleted eq ${params.isDeleted}`);

    if (params.isPremiumMusic)
        filter.push(params.isPremiumMusic === "true" ? `externalSongIds/any()` : "not externalSongIds/any()");

    if (params.editor) {
        if (params.editor === "uploaded") filter.push("levelId eq null");
        if (params.editor === "studio") filter.push(`levelTypeId eq ${LevelType.Studio}`);
        if (params.editor === "moments") filter.push(`levelTypeId eq ${LevelType.Moments}`);
    }

    if (params.access) query.access = params.access;

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) {
            filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
        }
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/video/moderation?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
