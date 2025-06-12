import { request } from "shared";

import { AssetOfferWithAssetInfo } from ".";

export async function getAssetOfferList(stage: string): Promise<AssetOfferWithAssetInfo[]> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage).assetmanager().get(`api/asset-offer?take=1000`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
