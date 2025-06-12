import qs from "query-string";

import { BaseQueryParams, request, ResultWithCount } from "shared";
import { PromotedSong } from "./api";
import { DEFAULT_PROMOTED_SONG_LIST_SIZE } from "urls";

export interface PromotedSongListQueryParams extends BaseQueryParams {
    key?: string;
    marketingCountries?: string | string[];
}

export const getPromotedSongList = async (
    stage: string,
    params: PromotedSongListQueryParams
): Promise<ResultWithCount<PromotedSong>> => {
    const query: any = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_PROMOTED_SONG_LIST_SIZE,
        $orderBy: "id desc"
    };

    const filter: string[] = [];

    if (params.marketingCountries) {
        typeof params.marketingCountries === "string"
            ? filter.push(`availableForCountries/any(v: v eq '${params.marketingCountries}')`)
            : filter.push(
                  params.marketingCountries
                      .map((marketingCountry) => `availableForCountries/any(v: v eq '${marketingCountry}')`)
                      .join(" or ")
              );
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/music/moderation/promoted-song?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
