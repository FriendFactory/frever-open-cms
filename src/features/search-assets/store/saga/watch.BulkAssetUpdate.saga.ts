import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { AssetData, AssetDataNames, editAssetDetails } from "features/search-assets/services";
import { bulkAssetUpdateAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { SEARCH_ASSET_URL } from "urls";
import { loadAssetListSaga } from "./watch.AssetList.saga";

export function* watchBulkAssetUpdateSaga() {
    yield takeEvery(bulkAssetUpdateAction.TYPE, function* (action: typeof bulkAssetUpdateAction.typeOf.action) {
        try {
            yield put(
                addPopUpMessageAction({
                    messageText: "Please wait...",
                    messageStyle: "loading",
                    key: action.assetType + "/BulkUpdate",
                    duration: 0
                })
            );

            yield all(
                action.assetList.map(function* (entity: Partial<AssetData[AssetDataNames]>) {
                    try {
                        const result: AssetData[AssetDataNames] = yield call(
                            editAssetDetails,
                            action.stage,
                            action.assetType,
                            entity
                        );

                        return result;
                    } catch (responseError) {
                        yield put(
                            addPopUpMessageAction({
                                messageText: `Failed to update ${action.assetType}(ID:${entity.id}). ${(
                                    responseError as Error
                                ).toString()}`,
                                messageStyle: "error"
                            })
                        );
                        return;
                    }
                })
            );

            // updating current list page
            const urlMatch = SEARCH_ASSET_URL.match(location, true);
            if (urlMatch.isMatched) {
                yield fork(loadAssetListSaga, {
                    stage: urlMatch.params.stage,
                    asset: urlMatch.params.asset,
                    params: urlMatch.query || {}
                });
            }

            yield put(
                addPopUpMessageAction({
                    messageText: "All assets updated successfully.",
                    messageStyle: "success",
                    key: action.assetType + "/BulkUpdate"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to edit the Asset. ${(responseError as Error).toString()}`,
                    messageStyle: "error",
                    key: action.assetType + "/BulkUpdate"
                })
            );
        }
    });
}
