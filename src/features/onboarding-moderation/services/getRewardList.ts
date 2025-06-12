import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { OnboardingReward } from "./api";
import { ONBOARDING_REWARD_LIST_PAGE_SIZE } from "urls";

export interface RewardListQueryParams extends BaseQueryParams {
    orderBy?: "id";

    id?: number;
    onboardingQuestGroupId?: number;
}

export async function getRewardList(
    stage: string,
    params: RewardListQueryParams
): Promise<ResultWithCount<OnboardingReward>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? ONBOARDING_REWARD_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.onboardingQuestGroupId) filter.push(`onboardingQuestGroupId eq ${params.onboardingQuestGroupId}`);

    if (filter.length) query.$filter = filter.join(" and ");

    if (params.orderBy) {
        query.$orderby = `${params.orderBy} ${params.sortDirection ?? "asc"}`;
    }

    const response = await request(stage)
        .assetmanager()
        .get(`api/onboarding/moderation/reward?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
