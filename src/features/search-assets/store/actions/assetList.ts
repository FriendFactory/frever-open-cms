import { defineAction, defineActionGroup } from "rd-redux-utils";

import { AssetData, AssetDataNames, AssetListParams, AssetType } from "features/search-assets/services";
import { AssetTypes } from "config";

export const assetListActionGroup = defineActionGroup<{
    stage: string;
    asset: AssetDataNames;
    params: AssetListParams;
}>("ASSET LIST");

export const assetListLoadingAction = assetListActionGroup.defineAction("LOADING");

export const assetListHandleLoadAction = assetListActionGroup.defineAction<{
    params: AssetListParams;
    expand?: string[];
    useCompactWardrobeList?: boolean;
}>("HANDLE LOAD");

export const assetListLoadedOkAction = assetListActionGroup.defineAction<{
    result: AssetData[AssetDataNames][];
    total?: number;
}>("LOADED OK");

export const assetListLoadedErrorAction = assetListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const bulkAssetUpdateAction = defineAction<{
    stage: string;
    assetType: string;
    assetList: Partial<AssetData[AssetDataNames]>[];
}>("BULK ASSET UPDATE");

export const assetBatchUpdateAction = defineAction<{
    stage: string;
    assetType: AssetTypes;
    data: Partial<AssetType<AssetTypes>>[];
}>("ASSET BATCH UPDATE");
