import * as qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { DEFAULT_COMMENT_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { VideoComment } from "./api";

export interface VideoCommentsQueryParams extends BaseQueryParams {
    caseSensitive?: string;
    filter?: "contains" | "eq" | "startswith" | "endswith";
    text?: string;
    isDeleted?: "false" | "true";

    time?: string;
    group?: string | number;
    videoId?: number;
}

export async function getVideoComments(
    stage: string,
    params: VideoCommentsQueryParams
): Promise<ResultWithCount<VideoComment>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_COMMENT_PAGE_SIZE,
        $orderBy: "id desc"
    };

    const filter = [];

    if (params.group) {
        isNaN(Number(params.group))
            ? filter.push(`groupNickname eq ${params.group}`)
            : filter.push(`groupId eq ${params.group}`);
    }

    if (params.text) {
        let newSearch: string;
        const searchType = params.caseSensitive === "true" ? "text" : "toupper(text)";
        const searchValue = params.caseSensitive === "true" ? `'${params.text}'` : `toupper('${params.text}')`;

        params.filter === "eq"
            ? (newSearch = `${searchType} eq ${searchValue}`)
            : (newSearch = `${params.filter ?? "contains"}(${searchType}, ${searchValue})`);

        filter.push(newSearch);
    }

    if (params.isDeleted) filter.push(`isDeleted eq ${params.isDeleted}`);

    if (params.videoId) filter.push(`videoId eq ${params.videoId}`);

    if (params.time) {
        const dates = dateToODataFormat(params.time);
        if (dates) filter.push(`time ge ${dates.start} and time le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/video/moderation/comments?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
