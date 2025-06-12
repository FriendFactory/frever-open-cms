import { defineAction, defineActionGroup } from "rd-redux-utils";

import { AssetOfferType, AssetOfferWithAssetInfo, CreateAssetOffer } from "features/search-assets/services";

export const assetOfferActionGroup =
    defineActionGroup<{ stage: string; assetId: number; assetOfferType: AssetOfferType }>("ASSET OFFER ACTION GROUP");

export const assetOfferLoadAction = assetOfferActionGroup.defineAction("LOAD");

export const assetOfferLoadingAction = assetOfferActionGroup.defineAction("LOADING");

export const assetOfferLoadedOkAction = assetOfferActionGroup.defineAction<{
    result: AssetOfferWithAssetInfo | null;
}>("LOADED OK");

export const assetOfferLoadedErrorAction = assetOfferActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const executeAssetOfferCommand = defineAction<{
    stage: string;
    command:
        | { type: "deactivate"; assetOffer: AssetOfferWithAssetInfo }
        | { type: "create-new"; assetIds: number[]; data: Omit<CreateAssetOffer, "assetId"> };
}>("EXECUTE ASSET OFFER COMMAND");

export const assetOffersByAssetIdsLoadingAction = defineAction<{
    stage: string;
    assetType: AssetOfferType;
    ids: number[];
}>("ASSET OFFERS BY ASSET IDS LOADING");

export const assetOffersByAssetIdsLoadedAction = defineAction<{
    stage: string;
    assetType: AssetOfferType;
    result: Array<{ assetId: number; data: AssetOfferWithAssetInfo | null }>;
}>("ASSET OFFERS BY ASSET IDS LOADED");
