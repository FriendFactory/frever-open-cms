import qs from "query-string";

import { request } from "shared";
import { dateToODataFormat } from "utils";
import { StarCreatorCandidate } from ".";
import { CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE } from "urls";

export interface CreatorCandidatesQueryParams {
    take?: number;
    skip?: number;

    orderBy?: "id" | "email" | "createdTime" | "modifiedTime";
    sortDirection?: "asc" | "desc";

    id?: number;
    email?: string;
    createdTime?: string;
    modifiedTime?: string;
}

export const getStarCreatorCandidates = async (
    stage: string,
    params: CreatorCandidatesQueryParams
): Promise<StarCreatorCandidate[]> => {
    const { take, skip, orderBy, sortDirection, ...restParams } = params;

    const query: any = {
        $top: take ?? CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE,
        $skip: skip ?? 0,
        $orderBy: `${orderBy || "id"} ${sortDirection || "desc"}`
    };

    const filter = [];

    if (restParams.id) filter.push(`id eq ${restParams.id}`);
    if (restParams.email) filter.push(`email eq ${restParams.email}`);

    if (restParams.createdTime) {
        const dates = dateToODataFormat(restParams.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }
    if (restParams.modifiedTime) {
        const dates = dateToODataFormat(restParams.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/StarCreatorCandidate?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code ${response.status}. ${response.statusText}`);
};
