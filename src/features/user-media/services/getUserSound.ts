import qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { UserSound } from "./api";

export interface GetUserSoundParams extends BaseQueryParams {
    id?: string;
    groupId?: string;
    createdTime?: string;
    isDeleted?: "true" | "false";

    orderBy?: "id" | "createdTime" | "size" | "duration";
    sortDirection?: "asc" | "desc";
}

export async function getUserSound(stage: string, params: GetUserSoundParams): Promise<UserSound[]> {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_LEVEL_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.groupId) filter.push(`groupId eq ${params.groupId}`);

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) {
            filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
        }
    }

    if (params.isDeleted)
        params.isDeleted === "true" ? filter.push(`deletedAt ne null`) : filter.push(`deletedAt eq null`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<UserSound[]>(`/api/userSound?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
