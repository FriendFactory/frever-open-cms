import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { UserActivity } from "./api";
import { DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE } from "urls";

const filters = ["refVideoId", "refTaskId", "refLevelId", "refGroupId", "refActorGroupId", "seasonId"] as const;

export type UserActivityFilterName = typeof filters[number];

export type UserActivityFilter<T extends string = UserActivityFilterName> = {
    [key in T]?: string;
};

export interface UserActivityQueryParams extends UserActivityFilter {
    skip?: number;
    take?: number;
    actionType?: string;

    orderBy?: "occurredAt";
    sortDirection?: "asc" | "desc";
}

export async function getUserActivity(
    stage: string,
    groupId: number,
    params: UserActivityQueryParams
): Promise<ResultWithCount<UserActivity>> {
    const query: { [x: string]: string | number } = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "occurredAt"} ${params.sortDirection ?? "desc"}`
    };

    const filter: string[] = [];

    filters.forEach((name) => {
        const value = params[name];
        if (value) filter.push(`${name} eq ${value}`);
    });

    if (params.actionType) query.actionType = params.actionType;

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<ResultWithCount<UserActivity>>(`api/profile/${groupId}/activity?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
