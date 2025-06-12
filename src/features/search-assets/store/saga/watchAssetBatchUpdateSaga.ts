import { call, fork, put, takeEvery } from "redux-saga/effects";

import { assetBatchUpdateAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { ASSETS_BATCH_MODE_URL, DETAILS_ASSET_URL } from "urls";
import { loadAssetListSaga } from "./watch.AssetList.saga";
import { assetBatchUpdate } from "features/search-assets/services";
import { loadAssetSaga } from "./watch.AssetDetails.saga";

export function* watchAssetBatchUpdateSaga() {
    yield takeEvery(assetBatchUpdateAction.TYPE, function* (action: typeof assetBatchUpdateAction.typeOf.action) {
        const key = action.assetType + "-bulk-update";
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: "Updating assets. Please wait...",
                    messageStyle: "loading",
                    key,
                    duration: 0
                })
            );

            yield call(assetBatchUpdate, action.stage, action.assetType, action.data);

            const urlMatch = ASSETS_BATCH_MODE_URL.match(location, true);
            if (urlMatch.isMatched) {
                yield fork(loadAssetListSaga, {
                    stage: urlMatch.params.stage,
                    asset: urlMatch.params.asset,
                    params: urlMatch.query || {}
                });
            }

            const detailsUrlMatch = DETAILS_ASSET_URL.match(location, true);
            if (detailsUrlMatch.isMatched) {
                yield fork(
                    loadAssetSaga,
                    detailsUrlMatch.params.stage,
                    detailsUrlMatch.params.asset,
                    detailsUrlMatch.params.id
                );
            }

            yield put(
                addPopUpMessageAction({
                    messageText: "Assets have been successfully updated.",
                    messageStyle: "success",
                    key
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update assets. ${(responseError as Error).toString()}`,
                    messageStyle: "error",
                    key
                })
            );
        }
    });
}
