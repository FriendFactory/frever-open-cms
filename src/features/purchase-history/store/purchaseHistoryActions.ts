import { defineActionGroup } from "rd-redux-utils";

import { UserPurchaseHistoryQueryParams } from "features/purchase-history/services/getPurchaseHistory";
import { InAppPurchaseOrder } from "features/purchase-history/services";

export const purchaseHistoryActionGroup =
    defineActionGroup<{ stage: string; groupId: number; params: UserPurchaseHistoryQueryParams }>("PURCHASE HISTORY");

export const purchaseHistoryLoadingAction = purchaseHistoryActionGroup.defineAction("LOADING");

export const purchaseHistoryLoadedOkAction =
    purchaseHistoryActionGroup.defineAction<{ result: InAppPurchaseOrder[] }>("LOADED OK");

export const purchaseHistoryLoadedErrorAction =
    purchaseHistoryActionGroup.defineAction<{ error: string }>("LOADED ERROR");
