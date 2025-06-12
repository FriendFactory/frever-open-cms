import * as qs from "query-string";

import { Video } from "features/video-moderation/services";
import { request, ResultWithCount } from "shared";
import { DEFAULT_REPORTED_VIDEO_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";

export interface GetReportedVideoListParams {
    skip?: number;
    take?: number;

    id?: string;
    videoId?: string;
    date?: string;
    closed?: "true" | "false";

    sort?: "report/createdTime" | "report/id" | "report/videoId" | "video/groupNickName";
    sortDirection?: "asc" | "desc";
}

export interface ReportedVideoInfo {
    video: Video;
    report: {
        id: number;
        videoId: number;
        createdTime: string;
        closedTime: string | null;
        message: string;
        reasonId: number;
        reporterGroupId?: number;
        assignedToUserId: number | null;
        closedByUserId: number | null;
        moderationNotes: string | null;
        hideVideo: boolean;
    };
}

export async function getReportedVideoList(
    stage: string,
    params: GetReportedVideoListParams
): Promise<ResultWithCount<ReportedVideoInfo>> {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_REPORTED_VIDEO_PAGE_SIZE,
        $orderBy: `${params.sort ?? "report/id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.id) filter.push(`report/id eq ${params.id}`);

    if (params.videoId) filter.push(`report/videoId eq ${params.videoId}`);

    if (params.date) {
        const dates = dateToODataFormat(params.date);
        if (dates) filter.push(`report/createdTime ge ${dates.start} and report/createdTime le ${dates.end}`);
    }

    if (params.closed)
        filter.push(params.closed === "true" ? `report/closedTime ne null` : `report/closedTime eq null`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<ResultWithCount<ReportedVideoInfo>>(`api/video-report/moderation?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
