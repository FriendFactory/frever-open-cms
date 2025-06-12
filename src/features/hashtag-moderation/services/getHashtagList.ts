import qs from "query-string";

import { request } from "shared";
import { DEFAULT_HASHTAG_LIST_SIZE } from "urls";
import { Hashtag } from "./api";

export interface GetHashtagListParams {
    skip?: number;
    take?: number;
    name?: string;
    sortBy?: "id" | "name" | "viewsCount" | "ChallengeSortOrder" | "videoCount";
    sortDirection?: "asc" | "desc";
}
export async function getHashtagList(stage: string, params: GetHashtagListParams) {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const query: any = {
        skip: params.skip ?? 0,
        take: params.take ?? DEFAULT_HASHTAG_LIST_SIZE,
        orderByColumnName: params.sortBy ?? "id",
        descending: params.sortDirection === "asc" ? "false" : "true"
    };

    if (params.name) {
        query.name = params.name;
    }

    const response = await request(stage)
        .assetmanager()
        .get<Hashtag[]>(`api/hashtag/moderation?${qs.stringify(query)}`);

    if (response.status === 200) {
        return { data: response.data, count: 3000 };
    }
    throw new Error(`Status code: ${response.status}.`);
}
