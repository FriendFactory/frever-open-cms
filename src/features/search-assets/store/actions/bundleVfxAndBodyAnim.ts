import { BundleAssetNames } from "features/search-assets/services";
import { defineAction } from "rd-redux-utils";
import { AssetInfoToUpdate } from "..";

export const deleteBundleVfxAndBodyAnimAction = defineAction<{
    stage: string;
    assetType: BundleAssetNames;
    id: number;
}>("DELETE BUNDLE VFX/BODY_ANIMATION");

export const updateBundleVfxAndBodyAnimAction = defineAction<{
    stage: string;
    assetType: BundleAssetNames;
    id: number;
    clearTargetType: BundleAssetNames;
    clearTargetId: number;
    data: AssetInfoToUpdate;
}>("UPDATE BUNDLE VFX/BODY_ANIMATION");
