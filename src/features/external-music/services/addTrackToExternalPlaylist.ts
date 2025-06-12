import { ExternalPlaylist } from ".";
import { musicProviderRequest } from "../musicProviderRequest";

export interface PlaylistTrackInfo {
    trackId: string;
    trackTitle: string;
    artistAppearsAs: string;
    trackVersion: string;
    releaseId: number;
    releaseArtistAppearsAs: string;
}

export async function addTrackToExternalPlaylist(
    stage: string,
    externalPaylistId: string,
    data: PlaylistTrackInfo[]
): Promise<ExternalPlaylist> {
    const response = await musicProviderRequest<{ playlist: ExternalPlaylist }>(stage, {
        url: `playlists/${externalPaylistId}/tracks`,
        method: "POST",
        data
    });

    if (response.status === 200) {
        return response.data.playlist;
    }

    throw new Error("Error Creating External Playlist");
}
