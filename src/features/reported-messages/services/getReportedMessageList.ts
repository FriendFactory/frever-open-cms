import qs from "query-string";

import { request, ResultWithCount } from "shared";
import { DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { ChatMessageReport } from "./api";

export interface ReportedMessageListParams {
    skip?: number;
    take?: number;

    orderBy?: "id" | "groupId" | "hideMessage" | "createdTime";
    sortDirection?: "asc" | "desc";

    id?: string;
    groupId?: string;
    date?: string;
    closed?: "true" | "false";
}

export async function getReportedMessageList(
    stage: string,
    params: ReportedMessageListParams
): Promise<ResultWithCount<ChatMessageReport>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];
    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.groupId) filter.push(`groupId eq ${params.groupId}`);

    if (params.date) {
        const dates = dateToODataFormat(params.date);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (params.closed) {
        filter.push(params.closed === "true" ? `closedTime ne null` : `closedTime eq null`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/chat/moderation/report?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
