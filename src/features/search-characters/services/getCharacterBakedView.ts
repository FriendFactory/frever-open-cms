import * as qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { DEFAULT_CHARACTER_BAKED_VIEW_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { CharacterBakedView } from "./api";

export interface CharacterBakedViewParams extends BaseQueryParams {
    id?: number;
    characterId?: number;
    isValid?: "true" | "false";
    createdTime?: string;
    modifiedTime?: string;

    orderBy?: "id" | "characterId";
}

export async function getCharacterBakedView(
    stage: string,
    params: CharacterBakedViewParams
): Promise<CharacterBakedView[]> {
    const query: any = {
        $skip: params?.skip ?? 0,
        $top: params?.take ?? DEFAULT_CHARACTER_BAKED_VIEW_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.characterId) filter.push(`characterId eq ${params.characterId}`);

    if (params.isValid) filter.push(`isValid eq ${params.isValid}`);

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    query.$orderBy = `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`;

    const response = await request(stage)
        .assetmanager()
        .get(`/api/CharacterBakedView?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
