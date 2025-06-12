import qs from "query-string";

import { VMEBackground } from "./api";
import { BaseQueryParams, ResultWithCount, request } from "shared";
import { DEFAULT_THEME_COLLECTIONS_LIST_SIZE, VME_BACKGROUND_LIST_URL } from "urls";

export interface VMEBackgroundQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;

    orderBy?: "id" | "name" | "sortOrder";
    isEnabled?: "true" | "false" | "all";
}

export const getVMEBackground = async (
    stage: string,
    params: VMEBackgroundQueryParams
): Promise<ResultWithCount<VMEBackground[]>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_THEME_COLLECTIONS_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    const listPage = VME_BACKGROUND_LIST_URL.match(location, true);
    if (!params.isEnabled && listPage.isMatched) filter.push("isEnabled eq true");

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`startsWith(tolower(name), tolower('${params.name}'))`);

    if (params.isEnabled && params.isEnabled !== "all") filter.push(`isEnabled eq ${params.isEnabled}`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/SetLocationBackground?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
