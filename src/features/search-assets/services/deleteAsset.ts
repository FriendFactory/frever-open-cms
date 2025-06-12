import { request } from "shared";

export async function deleteAsset(stage: string, assetType: string, assetId: number) {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!assetType || !assetId) {
        throw new Error("Asset is required");
    }

    const response = await request(stage).assetmanager().delete(`api/${assetType}/${assetId}`);

    if (response.status === 204) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
}
