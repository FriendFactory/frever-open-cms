import { request } from "shared";

export async function deleteLocalization(stage: string, key: string): Promise<undefined> {
    const response = await request(stage).assetmanager().delete(`api/localization/moderation/${key}`);

    if (response.status === 204) return response.data;

    throw new Error(`Failed. ${response?.status}. ${response?.statusText}`);
}
