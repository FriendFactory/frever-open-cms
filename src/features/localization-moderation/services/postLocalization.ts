import { request } from "shared";
import { Localization } from "./api";

export async function postLocalization(stage: string, data: Localization): Promise<undefined> {
    const response = await request(stage).assetmanager().post("api/localization/moderation", data);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
