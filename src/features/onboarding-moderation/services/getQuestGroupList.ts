import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE } from "urls";
import { OnboardingQuestGroup } from "./api";

export interface QuestGroupListQueryParams extends BaseQueryParams {
    orderBy?: "id" | "ordinal";

    id?: number;
    isEnabled?: "true" | "false";

    isoCode?: string;
    value?: string;
}

export async function getQuestGroupList(
    stage: string,
    params: QuestGroupListQueryParams
): Promise<ResultWithCount<OnboardingQuestGroup>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`,
        isoCode: params.isoCode ?? undefined,
        value: params.value ?? undefined
    };

    const filter = [];
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.isEnabled) filter.push(`isEnabled eq ${params.isEnabled}`);

    if (filter.length) query.$filter = filter.join(" and ");

    if (params.orderBy) {
        query.$orderby = `${params.orderBy} ${params.sortDirection ?? "asc"}`;
    }

    const response = await request(stage)
        .assetmanager()
        .get(`api/onboarding/moderation/quest/group?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
