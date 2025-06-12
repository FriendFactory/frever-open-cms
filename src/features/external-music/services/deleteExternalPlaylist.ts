import { ExternalPlaylist } from ".";
import { musicProviderRequest } from "../musicProviderRequest";

export async function deleteExternalPlaylist(stage: string, id: string): Promise<ExternalPlaylist> {
    const response = await musicProviderRequest<ExternalPlaylist>(stage, {
        url: `playlists/${id}`,
        method: "DELETE"
    });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error("Error deleting External Playlist");
}
