import { ExternalPlaylist } from ".";
import { musicProviderRequest } from "../musicProviderRequest";

export async function removeTrackFromPlaylist(
    stage: string,
    playlistId: string,
    playlistTrackId: string
): Promise<ExternalPlaylist> {
    const response = await musicProviderRequest<{ playlist: ExternalPlaylist }>(stage, {
        url: `playlists/${playlistId}/tracks/${playlistTrackId}`,
        method: "DELETE"
    });

    if (response.status === 200) {
        return response.data.playlist;
    }

    throw new Error("Error deleting External Playlist");
}
