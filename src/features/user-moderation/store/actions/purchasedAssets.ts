import { defineActionGroup } from "rd-redux-utils";

import { PurchasedAsset, PurchasedAssetsQueryParams } from "../../services";

export const purchasedAssetsActionGroup = defineActionGroup<{
    stage: string;
    params: PurchasedAssetsQueryParams;
}>("PURCHASED ASSETS");

export const purchasedAssetsLoadingAction = purchasedAssetsActionGroup.defineAction("LOADING");

export const purchasedAssetsLoadedOkAction = purchasedAssetsActionGroup.defineAction<{
    result: PurchasedAsset[];
    isNextPageAvailable: boolean;
}>("LOADED OK");

export const purchasedAssetsLoadedErrorAction = purchasedAssetsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
