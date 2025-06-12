import * as qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { dateToODataFormat } from "utils";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE } from "urls";
import { Level } from "./api";

export interface LevelListQueryParams extends BaseQueryParams {
    id?: number;
    groupId?: string;
    createdTime?: string;
    modifiedTime?: string;
    templateId?: string;
    remixFrom?: string;
    isDraft?: "true" | "false";
    isDeleted?: "true" | "false";
    orderBy?: "id" | "createdTime" | "modifiedTime";
    sortDirection?: "asc" | "desc";
}

const expand = ["event"];

export async function getLevelList(stage: string, params: LevelListQueryParams): Promise<Level[]> {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_LEVEL_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`,
        $expand: expand.toString()
    };

    const filter = [];

    if (params.groupId) filter.push(`groupId eq ${params.groupId}`);

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.templateId) filter.push(`levelTemplateId eq ${params.templateId}`);

    if (params.remixFrom) filter.push(`remixedFromLevelId eq ${params.remixFrom}`);

    if (params.isDeleted) filter.push(`isDeleted eq ${params.isDeleted}`);

    if (params.isDraft) filter.push(`isDraft eq ${params.isDraft}`);

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<Level[]>(`/api/level?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
