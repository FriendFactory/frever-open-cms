import { Playlist } from ".";
import { request } from "shared";

export async function updatePlaylistDetails(stage: string, data: Partial<Playlist>): Promise<Playlist> {
    const response = await request(stage).assetmanager().patch("api/ExternalPlaylist/", data);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
