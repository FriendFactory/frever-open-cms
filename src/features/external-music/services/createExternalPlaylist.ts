import { ExternalPlaylist } from ".";
import { musicProviderRequest } from "../musicProviderRequest";

export async function createExternalPlaylist(
    stage: string,
    data: Partial<ExternalPlaylist>
): Promise<ExternalPlaylist> {
    const response = await musicProviderRequest<{ playlist: ExternalPlaylist }>(stage, {
        url: "playlists",
        method: "POST",
        data
    });

    if (response.status === 200) {
        return response.data.playlist;
    }

    throw new Error("Error Creating ExternalPlaylist");
}
