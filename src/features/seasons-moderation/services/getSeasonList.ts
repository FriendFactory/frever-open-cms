import qs from "query-string";

import { request } from "shared";
import { DEFAULT_SEASON_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";

export interface SeasonListQueryParams {
    skip?: number;
    take?: number;

    id?: number;
    title?: string;
    startDate?: string;
    endDate?: string;

    orderBy?: "id" | "title" | "startDate" | "endDate";
    sortDirection?: "asc" | "desc";
}

export async function getSeasonList(stage: string, params: SeasonListQueryParams) {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_SEASON_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.title) filter.push(`startswith(tolower(title), tolower('${params.title}'))`);

    if (params.startDate) {
        const dates = dateToODataFormat(params.startDate);
        if (dates) filter.push(`startDate ge ${dates.start} and startDate le ${dates.end}`);
    }

    if (params.endDate) {
        const dates = dateToODataFormat(params.endDate);
        if (dates) filter.push(`endDate ge ${dates.start} and endDate le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/season?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
}
