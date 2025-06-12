import qs from "qs";
import { BaseQueryParams, request, ResultWithCount } from "shared";
import { SCHEDULED_MESSAGE_LIST_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { ScheduledMessage } from "../api";

export interface ScheduledMessageQueryParams extends BaseQueryParams {
    id?: number;
    status?: string;
    text?: string;
    scheduledForTime?: string;
    orderBy?: "id";
}

export const getScheduledMessage = async (
    stage: string,
    params: ScheduledMessageQueryParams
): Promise<ResultWithCount<ScheduledMessage>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? SCHEDULED_MESSAGE_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter: string[] = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.text) filter.push(`contains(tolower(text), tolower('${params.text}'))`);
    if (params.scheduledForTime) {
        const dates = dateToODataFormat(params.scheduledForTime);
        if (dates) filter.push(`scheduledForTime ge ${dates.start} and scheduledForTime le ${dates.end}`);
    }

    if (params.status) filter.push(`contains(tolower(status), tolower('${params.status}'))`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/chat/moderation/scheduled-message?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
