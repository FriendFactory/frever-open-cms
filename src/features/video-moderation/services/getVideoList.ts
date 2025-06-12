import * as qs from "query-string";

import { dateToODataFormat } from "utils";
import { BaseQueryParams, request, ResultWithCount } from "shared";
import { DEFAULT_VIDEO_PAGE_SIZE } from "urls";
import { Video } from "./api";

export interface GetVideoListParams extends BaseQueryParams {
    orderBy?: "createdTime" | "id" | "groupNickName" | "groupId" | "startListItem" | "";

    access?: number;
    video?: string | string[];
    level?: string;
    group?: string;
    date?: string;
    description?: string;
    hashtag?: string;
    templateId?: string;
    schoolTaskId?: string;
    remixedFromVideoId?: "true" | "false";
    isFeatured?: "true" | "false";
    fromTemplate?: "true" | "false";
    fromTask?: "true" | "false";
    hasLevel?: "true" | "false";
    country?: string;
    language?: string;

    isStartListItem?: "true" | "false";
}

export async function getVideoList(stage: string, params: GetVideoListParams): Promise<ResultWithCount<Video>> {
    const query = createVideoListQuery(params);

    const response = await request(stage)
        .assetmanager()
        .get<ResultWithCount<Video>>(`api/video/moderation?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}

export function createVideoListQuery(params: GetVideoListParams) {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_VIDEO_PAGE_SIZE
    };

    const filter = [];

    if (params.video) filter.push(`id eq ${params.video}`);
    if (params.level) filter.push(`levelId eq ${params.level}`);
    if (params.hashtag) filter.push(`hashtags/any(tag: tag/name eq '${params.hashtag}')`);
    if (params.description) filter.push(`Contains(tolower(description), tolower('${params.description}'))`);
    if (params.isStartListItem === "true") filter.push("startListItem ne null");
    if (params.country) filter.push(`country eq '${params.country}'`);
    if (params.language) filter.push(`language eq '${params.language}'`);

    if (params.access) query.access = params.access;

    if (params.isFeatured) {
        filter.push(
            params.isFeatured === "true"
                ? `toplistPosition ne ${9223372036854776000} and toplistPosition ne null`
                : `toplistPosition eq ${9223372036854776000} or topListPosition eq null`
        );
    }

    if (params.remixedFromVideoId) {
        filter.push(
            `${params.remixedFromVideoId == "true" ? "remixedFromVideoId ne null" : "remixedFromVideoId eq null"}`
        );
    }

    if (params.hasLevel) filter.push(`${params.hasLevel == "true" ? "levelId ne null" : "levelId eq null"}`);

    if (params.schoolTaskId || params.fromTask) {
        params.schoolTaskId
            ? filter.push(`schoolTaskId eq ${params.schoolTaskId}`)
            : filter.push(`schoolTaskId ${params.fromTask === "true" ? "ne" : "eq"} null`);
    }

    if (params.fromTemplate || params.templateId) {
        params.templateId
            ? filter.push(`templateIds/any(id: id eq ${params.templateId})`)
            : filter.push(`${params.fromTemplate == "true" ? "templateIds/any()" : "not templateIds/any()"}`);
    }

    if (params.fromTemplate || params.templateId) {
        params.templateId
            ? filter.push(`templateIds/any(id: id eq ${params.templateId})`)
            : filter.push(`${params.fromTemplate == "true" ? "templateIds/any()" : "not templateIds/any()"}`);
    }

    if (params.group) {
        const groupId = parseInt(params.group);

        !isNaN(groupId)
            ? filter.push(`groupId eq ${groupId}`)
            : filter.push(`Contains(groupNickName, '${params.group}')`);
    }

    if (params.date) {
        const dates = dateToODataFormat(params.date);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (filter.length) {
        query.$filter = filter.join(" and ");
    }

    if (params.isStartListItem === "true") {
        query.$orderBy = "startListItem asc";
    } else {
        query.$orderBy = `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`;
    }

    return query;
}
