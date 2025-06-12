import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { CREWS_LIST_BASE_PAGE_SIZE } from "urls";
import { Crew } from "./api";

export interface CrewListByMessagesQueryParams {
    skip?: number;
    take?: number;

    startDate?: string;
    endDate?: string;
}

export async function getCrewListByMessages(
    stage: string,
    params: CrewListByMessagesQueryParams
): Promise<ResultWithCount<Crew>> {
    const query: any = {
        skip: params.skip ?? 0,
        take: params.take ?? CREWS_LIST_BASE_PAGE_SIZE
    };

    if (params.startDate) query.startDate = params.startDate;
    if (params.endDate) query.endDate = params.endDate;

    const response = await request(stage)
        .assetmanager()
        .get(`api/crew/moderation/by-message?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
