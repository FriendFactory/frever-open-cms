import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { DEFAULT_CREW_REWARDS_PAGE_SIZE } from "urls";
import { CrewRewards } from "./api";

export interface CrewRewardsQueryParams {
    skip?: number;
    take?: number;

    orderBy?: "id" | "title" | "requiredTrophyScore";
    sortDirection?: "asc" | "desc";

    id?: number;
    title?: string;
    requiredTrophyScore?: number;
    isEnabled?: "true" | "false";
}

export async function getCrewRewards(
    stage: string,
    params: CrewRewardsQueryParams
): Promise<ResultWithCount<CrewRewards>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_CREW_REWARDS_PAGE_SIZE
    };

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.title) filter.push(`contains(tolower(title), tolower('${params.title}'))`);
    if (params.requiredTrophyScore) filter.push(`requiredTrophyScore eq ${params.requiredTrophyScore}`);
    if (params.isEnabled) filter.push(`isEnabled eq ${params.isEnabled}`);

    if (filter.length) query.$filter = filter.join(" and ");

    if (params.orderBy) {
        query.$orderby = `${params.orderBy} ${params.sortDirection ?? "asc"}`;
    } else {
        query.$orderBy = `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`;
    }

    const response = await request(stage)
        .assetmanager()
        .get(`api/crew/moderation/reward?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
