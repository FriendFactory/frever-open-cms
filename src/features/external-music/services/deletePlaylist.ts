import { request } from "shared";

export async function deletePlaylist(stage: string, id: number): Promise<undefined> {
    const response = await request(stage).assetmanager().delete(`api/ExternalPlaylist/${id}`);

    if (response.status === 204) {
        return response.data;
    }

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
