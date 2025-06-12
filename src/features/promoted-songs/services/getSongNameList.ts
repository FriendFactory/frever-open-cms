import qs from "query-string";

import { request } from "shared";
import { PromotedSongNameEntity, PromotedSongType } from "./api";

export const getSongNameList = async <T extends PromotedSongType>(
    stage: string,
    songType: T,
    ids: number[]
): Promise<PromotedSongNameEntity<T>[]> => {
    if (!ids.length) return [];

    const query = {
        $filter: ids.map((id) => `id eq ${id}`).join(" or "),
        $select: `${songType === "song" ? "name" : "songName"}, id`
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/${songType}?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
