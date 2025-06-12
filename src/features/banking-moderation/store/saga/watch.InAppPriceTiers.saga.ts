import { call, put, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { InAppPriceTier, getInAppPriceTiers } from "features/banking-moderation/services";
import {
    inAppPriceTiersLoadingAction,
    inAppPriceTiersLoadedOkAction,
    inAppPriceTiersLoadedErrorAction,
    inAppPriceTiersLoadAction
} from "../actions";

export function* watchInAppPriceTiersSaga() {
    yield takeEvery(
        inAppPriceTiersLoadAction.TYPE,
        function* ({ stage }: typeof inAppPriceTiersLoadAction.typeOf.action) {
            try {
                yield put(inAppPriceTiersLoadingAction({ stage }));

                const result: ResultWithCount<InAppPriceTier> = yield call(getInAppPriceTiers, stage);

                yield put(
                    inAppPriceTiersLoadedOkAction({
                        stage,
                        result
                    })
                );
            } catch (e) {
                yield put(
                    inAppPriceTiersLoadedErrorAction({
                        error: (e as Error).toString(),
                        stage
                    })
                );

                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to load in-app price tiers. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
