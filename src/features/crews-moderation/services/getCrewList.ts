import qs from "query-string";

import { ResultWithCount, request } from "shared";
import { Crew } from "./api";

export interface CrewListQueryParams {
    skip?: number;
    take?: number;

    id?: number;
    name?: string;
    description?: string;
    isPublic?: "true" | "false";
    isDeleted?: "true" | "false";
    chatId?: number;
    orderBy?: "id" | "name" | "trophyScore";
    sortDirection?: "asc" | "desc";
    member?: number;
    language?: number;

    unitTime?: string;
    messagesTime?: string;
}

export async function getCrewList(stage: string, params: CrewListQueryParams): Promise<ResultWithCount<Crew>> {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? 50,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.chatId) filter.push(`chatId eq ${params.chatId}`);
    if (params.name) filter.push(`startswith(tolower(name), tolower('${params.name}'))`);
    if (params.description) filter.push(`contains(tolower(description), tolower('${params.description}'))`);
    if (params.isPublic) filter.push(`isPublic eq ${params.isPublic}`);
    if (params.isDeleted) filter.push(`isDeleted eq ${params.isDeleted}`);
    if (params.member) filter.push(`members/any(member: member/groupId eq ${params.member})`);
    if (params.language) filter.push(`languageId eq ${params.language}`);

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/crew/moderation?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
