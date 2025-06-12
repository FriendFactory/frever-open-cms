import qs from "qs";
import { BaseQueryParams, request, ResultWithCount } from "shared";
import { DEFAULT_EMOTIONS_LIST_SIZE } from "urls/emotionsURLs";
import { Emotion } from "./api";

export interface EmotionsQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;
    sortOrder?: number;

    orderBy?: "id" | "name" | "sortOrder";
}

export const getEmotions = async (stage: string, params: EmotionsQueryParams): Promise<ResultWithCount<Emotion>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_EMOTIONS_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter: string[] = [];

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.name) filter.push(`startsWith(tolower(name), tolower('${params.name}'))`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/emotion/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
