import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { ONBOARDING_QUEST_LIST_PAGE_SIZE } from "urls";
import { OnboardingQuest } from "./api";

export interface QuestListQueryParams extends BaseQueryParams {
    orderBy?: "id" | "ordinal";

    id?: number;
    onboardingQuestGroupId?: number;
    ordinal?: 1;
    isEnabled?: "true" | "false";
    questType?: string;
    title?: string;
    description?: string;
    questParameter?: number;
}

export async function getQuestList(
    stage: string,
    params: QuestListQueryParams
): Promise<ResultWithCount<OnboardingQuest>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? ONBOARDING_QUEST_LIST_PAGE_SIZE,
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
        .get(`api/onboarding/moderation/quest?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
