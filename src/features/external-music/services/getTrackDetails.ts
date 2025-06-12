import { musicProviderRequest } from "../musicProviderRequest";
import { TracksSearchResultEntityTrack } from "./api";

const USAGE_TYPE = "adsupportedstreaming";

export interface TrackDetailsResult {
    track: TracksSearchResultEntityTrack;
}

export interface TrackDetailsQueryParams {
    trackId: number;
    country?: string;
}

export async function getTrackDetails(stage: string, params: TrackDetailsQueryParams): Promise<TrackDetailsResult> {
    const listParams = {
        usageTypes: USAGE_TYPE,
        imageSize: "182",
        ...params
    };

    const response = await musicProviderRequest(stage, { url: "track/details", method: "GET" }, listParams);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
