import { request } from "shared";

export async function exportLocalizationCSV(stage: string, keys: string[] = []): Promise<string> {
    const response = await request(stage).assetmanager().post("api/localization/moderation/export", keys);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
