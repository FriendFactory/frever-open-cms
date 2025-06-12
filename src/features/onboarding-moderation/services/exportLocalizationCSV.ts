import { request } from "shared";

import { ISOCodes } from "./api";

export async function exportLocalizationCSV(stage: string, isoCode?: ISOCodes): Promise<string> {
    const params = isoCode ? `isoCode=${isoCode}` : "";
    const response = await request(stage).assetmanager().post(`api/onboarding/moderation/export?${params}`);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
