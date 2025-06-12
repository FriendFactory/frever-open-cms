import { defineAction, defineActionGroup } from "rd-redux-utils";

import { AssetData, AssetDataNames } from "features/search-assets/services";

export type AssetInfoToUpdate = Partial<AssetData[AssetDataNames]> & { tags?: Array<string | number> };

export const assetDetailsActionGroup =
    defineActionGroup<{ stage: string; asset: AssetDataNames; id: number }>("ASSET DETAILS");

export const assetDetailsLoadingAction = assetDetailsActionGroup.defineAction("LOADING");

export const assetDetailsLoadedOkAction = assetDetailsActionGroup.defineAction<{
    result: AssetData[AssetDataNames];
}>("LOADED OK");

export const assetDetailsLoadedErrorAction = assetDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const assetEditAction = defineAction<{
    stage: string;
    asset: AssetDataNames;
    data: AssetInfoToUpdate;
}>("ASSETS EDIT");

export const updateAssetThumbnailAction = defineAction<{
    stage: string;
    asset: AssetDataNames | string;
    info: { id: number; resolution: string; extension: number };
    data: File;
}>("ASSET THUMBNAIL UPDATE");

export const updateAssetSongAction = defineAction<{
    stage: string;
    asset: AssetDataNames;
    info: { id: number; extension: number };
    data: File;
}>("ASSET SONG UPDATE");

export const assetDeleteAction =
    defineAction<{ stage: string; asset: string; assetsToDelete: Array<number> }>("ASSETS DELETE");
