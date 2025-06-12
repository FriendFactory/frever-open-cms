import qs from "qs";

import { request, ResultWithCount } from "shared";
import { DEFAULT_LOOT_BOX_PAGE_SIZE } from "../store";
import { LootBox } from "./api";

export interface LootBoxQueryParams {
    skip?: number;
    take?: number;

    orderBy?: "id";
    sortDirection?: "asc" | "desc";

    id?: number;
    title?: string;
}

export async function getLootBoxList(stage: string, params: LootBoxQueryParams): Promise<ResultWithCount<LootBox>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_LOOT_BOX_PAGE_SIZE
    };

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.title) filter.push(`contains(tolower(title), tolower('${params.title}'))`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/crew/moderation/lootbox?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
