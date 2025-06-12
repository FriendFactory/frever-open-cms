import qs from "query-string";

import { BaseQueryParams, ResultWithCount, request } from "shared";
import { DEFAULT_RACE_LIST_SIZE } from "urls";
import { Race } from "./api";

export interface RaceListQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;
    intellectualPropertyId?: number;

    orderBy?: "id" | "name";
}

export const getRaceList = async (stage: string, params: RaceListQueryParams): Promise<ResultWithCount<Race>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_RACE_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`startswith(tolower(name), tolower('${params.name}'))`);
    if (params.intellectualPropertyId) filter.push(`isNew eq ${params.intellectualPropertyId}`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/race/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
