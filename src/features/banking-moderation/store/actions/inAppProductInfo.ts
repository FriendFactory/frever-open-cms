import { defineAction, defineActionGroup } from "rd-redux-utils";

import { InAppProduct, InAppProductDetails } from "features/banking-moderation/services";
import { InAppProductDetailsFile } from "features/banking-moderation/containers/InAppProductInfo/SpecialOfferListContainer";

export const inAppProductInfoActionGroup = defineActionGroup<{ stage: string; id: number }>("IN-APP-PRODUCT INFO");

export const inAppProductInfoLoadingAction = inAppProductInfoActionGroup.defineAction("LOADING");

export const inAppProductInfoLoadedOkAction =
    inAppProductInfoActionGroup.defineAction<{ result: InAppProduct }>("LOADED OK");

export const inAppProductInfoLoadedErrorAction =
    inAppProductInfoActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const inAppProductPostAction =
    defineAction<{ stage: string; data: Partial<InAppProduct>; thumbnails?: InAppProductDetailsFile[] }>(
        "IN-APP-PRODUCT POST"
    );

export const inAppProductDetailsPostAction = defineAction<{
    stage: string;
    data: Partial<InAppProductDetails>;
    thumbnails?: InAppProductDetailsFile[];
}>("IN-APP-PRODUCT-DETAILS POST");
