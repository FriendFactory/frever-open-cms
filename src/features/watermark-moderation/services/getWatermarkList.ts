import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { DEFAULT_WATERMARK_LIST_SIZE } from "urls";
import { Watermark } from "./api";

export interface WatermarkListQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;

    orderBy?: "id" | "name" | "durationSeconds";
}

export const getWatermarkList = async (
    stage: string,
    params: WatermarkListQueryParams
): Promise<ResultWithCount<Watermark>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_WATERMARK_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`startswith(tolower(name), tolower('${params.name}'))`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/watermark/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
