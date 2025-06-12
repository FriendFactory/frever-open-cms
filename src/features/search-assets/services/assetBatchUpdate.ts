import { request } from "shared";
import { AssetType } from "./api";
import { AssetTypes } from "config";

export async function assetBatchUpdate<T extends AssetTypes>(
    stage: string,
    asset: T,
    data: Partial<AssetType<T>>[]
): Promise<undefined> {
    const response = await request(stage).assetmanager().patch(`api/asset/moderation/${asset}`, data);

    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}.`);
}
