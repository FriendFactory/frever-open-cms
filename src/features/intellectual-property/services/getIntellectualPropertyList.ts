import qs from "query-string";

import { BaseQueryParams, ResultWithCount, request } from "shared";
import { INTELLECTUAL_PROPERTY_LIST_SIZE } from "urls";
import { IntellectualProperty } from "./api";

export interface IntellectualPropertyQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;

    orderBy?: "id" | "name";
}

export const getIntellectualPropertyList = async (
    stage: string,
    params: IntellectualPropertyQueryParams
): Promise<ResultWithCount<IntellectualProperty>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? INTELLECTUAL_PROPERTY_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`startswith(tolower(name), tolower('${params.name}'))`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/intellectual-property/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
