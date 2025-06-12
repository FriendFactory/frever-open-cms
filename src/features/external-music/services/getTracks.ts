import { musicProviderRequest } from "../musicProviderRequest";
import { DEFAULT_PLAYLISTS_PAGE_SIZE } from "urls";
import { TracksSearchResultEntityTrack } from "./api";

const USAGE_TYPE = "adsupportedstreaming";

export interface TracksSearchResultEntity {
    type: "track";
    score: number;
    track: TracksSearchResultEntityTrack;
}

export interface TracksSearchResult {
    page: number;
    pageSize: number;
    totalItems: number;
    searchResult: TracksSearchResultEntity[];
}

export interface TracksSearchQueryParams {
    page?: number | string;
    pageSize?: number | string;
    country?: string;
    q: string;
}

export async function getTracks(stage: string, params: TracksSearchQueryParams): Promise<TracksSearchResult> {
    const listParams = {
        page: "1",
        pageSize: DEFAULT_PLAYLISTS_PAGE_SIZE.toString(),
        usageTypes: USAGE_TYPE,
        imageSize: "182",
        ...params
    };

    const response = await musicProviderRequest<{
        status: Response["status"];
        version: string;
        searchResults: TracksSearchResult;
    }>(stage, { url: "track/search", method: "GET" }, listParams);

    if (response.status === 200) {
        return response.data.searchResults;
    }

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
