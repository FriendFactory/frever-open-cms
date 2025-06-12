import { request } from "shared/request";
import { BundleAssetNames } from "./api";

export const deleteBundleVfxAndAnim = async (
    stage: string,
    assetType: BundleAssetNames,
    id: number
): Promise<undefined> => {
    const response = await request(stage)
        .assetmanager()
        .delete(`api/asset/moderation/animation-vfx/${assetType}/${id}`);

    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}`);
};
