import * as qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { dateToODataFormat } from "utils";
import { DEFAULT_OUTFIT_LIST_PAGE_SIZE } from "urls";
import { Outfit } from "./api";

export interface OutfitListQueryParams extends BaseQueryParams {
    id?: number;
    groupId?: number;
    createdTime?: string;
    modifiedTime?: string;
    isDeleted?: "true" | "false";
    orderBy?: "id" | "createdTime" | "modifiedTime";
    sortDirection?: "asc" | "desc";
}

export async function getOutfitList(
    stage: string,
    params: OutfitListQueryParams,
    expand?: string[]
): Promise<Outfit[]> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_OUTFIT_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.groupId) filter.push(`groupId eq ${params.groupId}`);
    if (params.isDeleted) filter.push(`isDeleted eq ${params.isDeleted}`);
    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    if (expand) query.$expand = expand.join(", ");

    const response = await request(stage)
        .assetmanager()
        .get<Outfit[]>(`/api/outfit?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
