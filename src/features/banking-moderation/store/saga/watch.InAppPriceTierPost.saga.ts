import { call, put, select, takeEvery } from "redux-saga/effects";

import { AppState } from "app-state";
import { postEntity } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { InAppPriceTier } from "features/banking-moderation/services";
import { inAppPriceTiersPostInfoAction, inAppPriceTiersLoadedOkAction, inAppPriceTiersLoadingAction } from "../actions";

export function* watchInAppPriceTierPostSaga() {
    yield takeEvery(
        inAppPriceTiersPostInfoAction.TYPE,
        function* (action: typeof inAppPriceTiersPostInfoAction.typeOf.action) {
            try {
                const newItem: InAppPriceTier = yield call(
                    postEntity,
                    action.stage,
                    "in-app-purchase/price-tier",
                    action.data
                );

                yield put(inAppPriceTiersLoadingAction({ stage: action.stage }));

                const appState: AppState = yield select();
                const { data = [], total = 0 } = appState.inAppPriceTiers[action.stage];
                const result = { data, count: total };
                let isItemUpdated = false;

                result.data = result?.data?.map((item) => {
                    if (item.id === newItem.id) {
                        isItemUpdated = true;
                        return newItem;
                    }
                    return item;
                });

                if (!isItemUpdated) {
                    result.data = [newItem, ...result.data];
                    result.count++;
                }

                yield put(
                    inAppPriceTiersLoadedOkAction({
                        stage: action.stage,
                        result
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to post in-app price tier. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
