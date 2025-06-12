import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { AssetOfferType, AssetOfferWithAssetInfo, getAssetOfferByAssetId } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";
import {
    assetOfferLoadAction,
    assetOfferLoadingAction,
    assetOfferLoadedOkAction,
    assetOfferLoadedErrorAction
} from "../actions";

export function* watchAssetOfferSaga() {
    yield takeEvery(assetOfferLoadAction.TYPE, function* (action: typeof assetOfferLoadAction.typeOf.action) {
        const { type, ...params } = action;

        yield spawn(loadAssetOffer, params);
    });
}

export function* loadAssetOffer(params: { stage: string; assetId: number; assetOfferType: AssetOfferType }) {
    try {
        yield put(assetOfferLoadingAction(params));

        const result: AssetOfferWithAssetInfo = yield call(
            getAssetOfferByAssetId,
            params.stage,
            params.assetId,
            params.assetOfferType
        );

        yield put(
            assetOfferLoadedOkAction({
                ...params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            assetOfferLoadedErrorAction({
                ...params,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load Asset Offer. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
