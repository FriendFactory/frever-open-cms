import { defineActionGroup } from "rd-redux-utils";

import { AssetOfferWithAssetInfo } from "features/search-assets/services";

export const assetOfferListActionGroup = defineActionGroup<{ stage: string }>("ASSET OFFER LIST");

export const assetOfferListLoadAction = assetOfferListActionGroup.defineAction("LOAD");

export const assetOfferListLoadingAction = assetOfferListActionGroup.defineAction("LOADING");

export const assetOfferListLoadedOkAction = assetOfferListActionGroup.defineAction<{
    result: AssetOfferWithAssetInfo[];
}>("LOADED OK");

export const assetOfferListLoadedErrorAction = assetOfferListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
