import { call, put, takeEvery } from "redux-saga/effects";

import { AssetOfferWithAssetInfo, getAssetOfferList } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";
import {
    assetOfferListLoadAction,
    assetOfferListLoadingAction,
    assetOfferListLoadedOkAction,
    assetOfferListLoadedErrorAction
} from "../actions";

export function* watchLoadAssetOfferListSaga() {
    yield takeEvery(assetOfferListLoadAction.TYPE, function* (action: typeof assetOfferListLoadAction.typeOf.action) {
        try {
            yield put(assetOfferListLoadingAction({ stage: action.stage }));

            const result: AssetOfferWithAssetInfo[] = yield call(getAssetOfferList, action.stage);

            yield put(
                assetOfferListLoadedOkAction({
                    stage: action.stage,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                assetOfferListLoadedErrorAction({
                    stage: action.stage,
                    error: (responseError as Error).toString()
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load Asset Offer List. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
