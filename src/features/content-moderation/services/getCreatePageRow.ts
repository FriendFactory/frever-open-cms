import qs from "query-string";

import { BaseQueryParams, ResultWithCount, request } from "shared";
import { CREATE_PAGE_LIST_SIZE } from "urls";
import { CreatePageRow } from "./api";

export interface CreatePageRowQueryParams extends BaseQueryParams {
    id?: number;
    title?: string;
    contentType?: string;
    contentQuery?: string;
    isEnabled?: "true" | "false";

    orderBy?: "id" | "title" | "sortOrder";
}

export const getCreatePageRow = async (
    stage: string,
    params: CreatePageRowQueryParams
): Promise<ResultWithCount<CreatePageRow>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? CREATE_PAGE_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.title) filter.push(`contains(tolower(title), tolower('${params.title}'))`);
    if (params.contentType) filter.push(`startswith(tolower(contentType), tolower('${params.contentType}'))`);
    if (params.contentQuery) filter.push(`startswith(tolower(contentQuery), tolower('${params.contentQuery}'))`);
    if (params.isEnabled) filter.push(`isEnabled eq ${params.isEnabled}`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/create-page/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
