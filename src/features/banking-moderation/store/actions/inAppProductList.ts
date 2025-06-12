import { defineActionGroup } from "rd-redux-utils";

import { InAppProductsQueryParams, InAppProduct } from "features/banking-moderation/services";
import { ResultWithCount } from "shared";

export const inAppProductListActionGroup =
    defineActionGroup<{ stage: string; params: InAppProductsQueryParams }>("IN-APP-PRODUCT LIST");

export const inAppProductListLoadingAction = inAppProductListActionGroup.defineAction("LOADING");

export const inAppProductListLoadedOkAction =
    inAppProductListActionGroup.defineAction<{ result: ResultWithCount<InAppProduct> }>("LOADED OK");

export const inAppProductListLoadedErrorAction =
    inAppProductListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
