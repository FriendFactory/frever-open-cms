import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { Bot } from "./api";
import { DEFAULT_BOT_LIST_PAGE_SIZE } from "urls";

export interface BotListQueryParams {
    skip?: number;
    take?: number;

    id?: string;
    groupId?: string;
    allowedActivityTypes?: string | string[];
    isEnabled?: "true" | "false";
    runInSimulationMode?: "true" | "false";
}

export async function getBots(stage: string, params: BotListQueryParams): Promise<ResultWithCount<Bot>> {
    const query: any = {
        $skip: params?.skip ?? 0,
        $top: params?.take ?? DEFAULT_BOT_LIST_PAGE_SIZE,
        $orderBy: "id desc"
    };

    const filter: string[] = [];

    if (params.id) {
        const result = params.id
            .split(",")
            .filter((el) => !!el.trim() && !isNaN(Number(el)))
            .map((el) => `id eq ${el}`)
            .join(" or ");

        filter.push(`(${result})`);
    }

    if (params.allowedActivityTypes) {
        typeof params.allowedActivityTypes === "string"
            ? filter.push(`allowedActivityTypes/any(type: type eq '${params.allowedActivityTypes}') `)
            : filter.push(
                  params.allowedActivityTypes
                      .map((val) => `allowedActivityTypes/any(type: type eq '${val}') `)
                      .join(" or ")
              );
    }

    if (params.groupId) filter.push(`groupId eq ${params.groupId}`);

    if (params.isEnabled) filter.push(`isEnabled eq ${params.isEnabled}`);

    if (params.runInSimulationMode) filter.push(`runInSimulationMode eq ${params.runInSimulationMode}`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/bot?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
