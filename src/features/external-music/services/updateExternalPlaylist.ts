import { ExternalPlaylist } from ".";
import { musicProviderRequest } from "../musicProviderRequest";

export async function updateExternalPlaylist(
    stage: string,
    data: Partial<ExternalPlaylist>,
    replace?: boolean
): Promise<ExternalPlaylist> {
    const { id, ...restData } = data;

    const response = await musicProviderRequest<{ playlist: ExternalPlaylist }>(stage, {
        url: replace ? `playlists/${id}` : `playlists/${id}/details`,
        method: "POST",
        data: restData
    });

    if (response.status === 200) {
        return response.data.playlist;
    }

    throw new Error("Error Editing ExternalPlaylist");
}
