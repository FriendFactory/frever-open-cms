import qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";

export interface UserSocialProfile {
    mainGroupId: number;
    nickName: string;
    kpi: {
        followersCount: number;
        followingCount: number;
        videoLikesCount: number;
        publishedVideoCount: number;
        totalVideoCount: number;
        taggedInVideoCount: number;
        totalDraftsCount: number;
        totalLevelsCount: number;
    };
    mainCharacter: {
        id: number;
        name: string;
        files: [{ version: string; file: number; resolution: string; extension: number }];
    };
}

export type LeaderboardListOrderBy = "videoLikesCount" | "followersCount" | "totalLevelsCount" | "totalVideoCount";

export interface GetLeaderboardListParams extends BaseQueryParams {
    propertyName?: LeaderboardListOrderBy;
    dateRange?: string;
    isFeatured?: "true" | "false";
}

export async function getLeaderboardList(stage: string, params: GetLeaderboardListParams): Promise<UserSocialProfile> {
    const query: any = {
        skip: params.skip ?? 0,
        take: params.take ?? DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE
    };

    if (params.isFeatured) query.isFeatured = params.isFeatured;

    if (params.dateRange) {
        const dates = dateToODataFormat(params.dateRange);
        if (dates) {
            const { start, end } = dates;

            query.startDate = start ?? null;
            query.endDate = end ?? null;
        }
    }

    const response = await request(stage)
        .assetmanager()
        .get(`api/profile/by/${params.propertyName ?? "followersCount"}?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
