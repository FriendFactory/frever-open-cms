import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";
import { checkUserAccess } from "shared/checkUserAccess";

import { addPopUpMessageAction } from "shared/store";
import { USER_PURCHASE_HISTORY_TAB_URL } from "urls";
import { InAppPurchaseOrder } from "../services";
import { getUserPurchaseHistory } from "../services/getPurchaseHistory";
import {
    purchaseHistoryLoadingAction,
    purchaseHistoryLoadedOkAction,
    purchaseHistoryLoadedErrorAction
} from "./purchaseHistoryActions";

export function* watchLoadPurchaseHistorySaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_PURCHASE_HISTORY_TAB_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage, id: groupId } = urlMatch.params;
        const params = urlMatch.query || {};
        try {
            yield put(purchaseHistoryLoadingAction({ stage, groupId, params }));

            const result: InAppPurchaseOrder[] = yield call(
                getUserPurchaseHistory,
                stage,
                groupId,
                urlMatch.query || {}
            );

            yield put(
                purchaseHistoryLoadedOkAction({
                    stage,
                    groupId,
                    params,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                purchaseHistoryLoadedErrorAction({
                    error: (responseError as Error).toString(),
                    stage,
                    groupId,
                    params
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load user purchase history. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
