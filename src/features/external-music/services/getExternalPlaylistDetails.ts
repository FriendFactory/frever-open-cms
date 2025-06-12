import { musicProviderRequest } from "../musicProviderRequest";
import { ExternalPlaylist } from "./api";

export async function getExternalPlaylistDetails(
    stage: string,
    id: string,
    withTracks?: boolean
): Promise<ExternalPlaylist> {
    const url = withTracks ? `playlists/${id}` : `playlists/${id}/details`;

    const response = await musicProviderRequest<{ playlist: ExternalPlaylist }>(stage, {
        url,
        method: "GET"
    });

    if (response.status === 200) {
        return response.data.playlist;
    }

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
