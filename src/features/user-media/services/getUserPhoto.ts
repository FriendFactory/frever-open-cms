import qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { Photo } from "./api";

export interface GetUserPhotoParams extends BaseQueryParams {
    id?: string;
    uploaderUserId?: string;
    createdTime?: string;
    modifiedTime?: string;

    orderBy?: "id" | "createdTime" | "modifiedTime";
    sortDirection?: "asc" | "desc";
}

export async function getUserPhoto(stage: string, params: GetUserPhotoParams): Promise<Photo[]> {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_LEVEL_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.uploaderUserId) filter.push(`uploaderUserId eq ${params.uploaderUserId}`);
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) {
            filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
        }
    }
    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) {
            filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
        }
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<Photo[]>(`/api/photo?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
