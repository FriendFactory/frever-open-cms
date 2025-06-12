import qs from "query-string";
import { BaseQueryParams } from "shared";

import { DEFAULT_TEMPLATE_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";

export interface TemplateFilterParams extends BaseQueryParams {
    skip?: number;
    id?: number;
    title?: string;
    categoryId?: number;
    filter?: "contains" | "eq" | "startswith" | "endswith";
    caseSensitive?: boolean;
    creatorId?: number;
    eventId?: number;
    characterCount?: number;
    createdTime?: string;
    modifiedTime?: string;
    isDeleted?: "true" | "false";
    sortBy?:
        | "id"
        | "creatorId"
        | "eventId"
        | "templateSubCategoryId"
        | "characterCount"
        | "trendingSortingOrder"
        | "usageCount"
        | "title"
        | "createdTime"
        | "modifiedTime";
    sortDirection?: "asc" | "desc";
}

export function createTemplateListQuery(params: TemplateFilterParams) {
    let query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_TEMPLATE_LIST_PAGE_SIZE,
        $orderBy: `${params.sortBy ?? "id"} ${params.sortDirection ?? "desc"}`,
        $count: true,
        category: params.categoryId
    };

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.creatorId) filter.push(`creatorId eq ${params.creatorId}`);

    if (params.characterCount) filter.push(`characterCount eq ${params.characterCount}`);

    if (params.eventId) filter.push(`eventId eq ${params.eventId}`);

    if (params.isDeleted) {
        filter.push(`isDeleted ne ${params.isDeleted}`);
    }

    if (params.title) {
        params.filter === "eq"
            ? filter.push(`toupper(title) eq toupper('${params.title}')`)
            : filter.push(`${params.filter ?? "contains"}(toupper(title), toupper('${params.title}'))`);
    }

    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    return qs.stringify(query);
}
