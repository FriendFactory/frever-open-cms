import { defineActionGroup } from "rd-redux-utils";

import { AssetTypes } from "config";
import { AssetData } from "features/search-assets/services";
import { TagAssetListFilterParams } from "features/search-assets/containers/TagAssetList/TagAssetListFilterFormContainer";

export type TagAssetNames = Exclude<AssetTypes, "CameraAnimationTemplate">;
export type TagAsset = AssetData[TagAssetNames] & { assetType: TagAssetNames };

export const tagAssetListActionGroup = defineActionGroup<{
    stage: string;
    params: TagAssetListFilterParams;
}>("TAG ASSET LIST");

export const tagAssetListLoadingAction = tagAssetListActionGroup.defineAction("LOADING");

export const tagAssetListLoadedOkAction = tagAssetListActionGroup.defineAction("LOADED OK");
