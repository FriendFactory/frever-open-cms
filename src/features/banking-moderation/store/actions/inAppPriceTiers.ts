import { defineAction, defineActionGroup } from "rd-redux-utils";

import { InAppPriceTier } from "features/banking-moderation/services";
import { ResultWithCount } from "shared";

export const inAppPriceTiersActionGroup = defineActionGroup<{ stage: string }>("IN-APP PRICE TIERS");

export const inAppPriceTiersLoadAction = inAppPriceTiersActionGroup.defineAction("LOAD");

export const inAppPriceTiersLoadingAction = inAppPriceTiersActionGroup.defineAction("LOADING");

export const inAppPriceTiersLoadedOkAction =
    inAppPriceTiersActionGroup.defineAction<{ result: ResultWithCount<InAppPriceTier> }>("LOADED OK");

export const inAppPriceTiersLoadedErrorAction =
    inAppPriceTiersActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const inAppPriceTiersPostInfoAction = defineAction<{ stage: string; data: Partial<InAppPriceTier> }>(
    "UPDATE IN-APP PRICE TIER INFO"
);
