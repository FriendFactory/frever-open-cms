import qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { VideoClip } from "./api";

export interface GetUserVideoClipParams extends BaseQueryParams {
    id?: string;
    uploaderUserId?: string;
    createdTime?: string;

    duration?: number;
    orderBy?: "id" | "createdTime" | "modifiedTime" | "duration";
    sortDirection?: "asc" | "desc";
}

export async function getUserVideoClip(stage: string, params: GetUserVideoClipParams): Promise<VideoClip[]> {
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

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<VideoClip[]>(`/api/videoClip?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
