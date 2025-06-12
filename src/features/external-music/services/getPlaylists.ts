import qs from "query-string";

import { request } from "shared";
import { Playlist } from "./api";
import { DEFAULT_PLAYLISTS_PAGE_SIZE } from "urls";

export interface PlaylistsQueryParams {
    skip?: number;
    take?: number;
}

export async function getPlaylists(stage: string, params: PlaylistsQueryParams): Promise<Playlist[]> {
    const listParams = {
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_PLAYLISTS_PAGE_SIZE,
        $orderBy: "id desc"
    };

    const response = await request(stage)
        .assetmanager()
        .get(`api/ExternalPlaylist?${qs.stringify(listParams)}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
