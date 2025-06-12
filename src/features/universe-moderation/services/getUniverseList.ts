import qs from "query-string";

import { BaseQueryParams, ResultWithCount, request } from "shared";
import { DEFAULT_UNIVERSE_LIST_SIZE } from "urls";
import { Universe } from "./api";

export interface UniverseListQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;
    isNew?: "true" | "false";
    orderBy?: "id" | "name";
}

export const getUniverseList = async (
    stage: string,
    params: UniverseListQueryParams
): Promise<ResultWithCount<Universe>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_UNIVERSE_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`startswith(tolower(name), tolower('${params.name}'))`);
    if (params.isNew) filter.push(`isNew eq ${params.isNew}`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/universe/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
