import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { BACKGROUND_AI_LIST_URL, DEFAULT_THEME_COLLECTIONS_LIST_SIZE } from "urls";
import { BackgroundAI } from "../api";

export interface BackgroundAIQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;

    orderBy?: "id" | "name" | "sortOrder";
    isEnabled?: "true" | "false" | "all";
}

export const getBackgroundsAI = async (
    stage: string,
    params: BackgroundAIQueryParams
): Promise<ResultWithCount<BackgroundAI[]>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_THEME_COLLECTIONS_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    const listPage = BACKGROUND_AI_LIST_URL.match(location, true);
    if (!params.isEnabled && listPage.isMatched) filter.push("isEnabled eq true");

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`startsWith(tolower(name), tolower('${params.name}'))`);

    if (params.isEnabled && params.isEnabled !== "all") filter.push(`isEnabled eq ${params.isEnabled}`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/SetLocationBackgroundSettings?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
