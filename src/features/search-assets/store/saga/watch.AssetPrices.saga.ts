import { all, call, put } from "redux-saga/effects";

import { AssetOfferType, AssetOfferWithAssetInfo, getAssetOfferByAssetId } from "features/search-assets/services";
import { assetOffersByAssetIdsLoadedAction, assetOffersByAssetIdsLoadingAction } from "../actions";

export function* loadAssetPricesSaga(stage: string, assetType: AssetOfferType, ids: number[]) {
    yield put(assetOffersByAssetIdsLoadingAction({ stage, ids, assetType }));

    const result: typeof assetOffersByAssetIdsLoadedAction.typeOf.action.result = yield all(
        ids.map(function* (assetId) {
            const data: AssetOfferWithAssetInfo | null = yield call(getAssetOfferByAssetId, stage, assetId, assetType);
            return { assetId, data };
        })
    );

    yield put(assetOffersByAssetIdsLoadedAction({ stage, assetType, result }));
}
