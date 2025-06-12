import { call, fork, put, takeEvery } from "redux-saga/effects";

import { assetDetailsLoadedOkAction, assetEditAction, AssetInfoToUpdate } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { AssetData, editAssetDetails } from "../../services";
import { Assets, AssetTypes } from "config";
import { DETAILS_ASSET_URL, SEARCH_ASSET_URL } from "urls";
import { loadAssetSaga } from "./watch.AssetDetails.saga";
import { handleTagList } from "shared/store/saga/handleTagList.saga";
import { loadAssetListSaga } from "./watch.AssetList.saga";
import { loadUsersByUploaderAndUpdaterIds } from "./loadUsersByUploaderAndUpdaterIds";

export function* watchAssetEditDetailsSaga() {
    yield takeEvery(assetEditAction.TYPE, function* (action: typeof assetEditAction.typeOf.action) {
        yield* editAssetDetailsWorker(action.stage, action.asset, action.data);
    });
}

export function* editAssetDetailsWorker(stage: string, asset: keyof AssetData, assetInfo: AssetInfoToUpdate) {
    try {
        const data = { ...assetInfo };

        if ("tags" in data && !!data.tags) {
            data.tags = yield* handleTagList(stage, data.tags);
        }

        const result: AssetData[AssetTypes] = yield call(editAssetDetails, stage, asset, data);

        const detailsUrlMatch = DETAILS_ASSET_URL.match(location, true);
        const listUrlMatch = SEARCH_ASSET_URL.match(location, true);
        const isNotSubAsset = detailsUrlMatch.isMatched ? detailsUrlMatch.params.asset === asset : false;

        if (Object.keys(Assets).includes(asset) && isNotSubAsset) {
            yield put(
                assetDetailsLoadedOkAction({
                    stage: stage,
                    asset: asset,
                    id: result.id,
                    result
                })
            );
        } else {
            if (detailsUrlMatch.isMatched) {
                yield fork(
                    loadAssetSaga,
                    detailsUrlMatch.params.stage,
                    detailsUrlMatch.params.asset,
                    detailsUrlMatch.params.id
                );
            }
            if (listUrlMatch.isMatched) {
                const { stage, asset } = listUrlMatch.params;
                const params = listUrlMatch.query || {};
                yield fork(loadAssetListSaga, { stage, asset, params });
            }
        }

        if (detailsUrlMatch.isMatched) {
            yield* loadUsersByUploaderAndUpdaterIds(stage, asset, result.id);
        }

        yield put(
            addPopUpMessageAction({
                messageText: `${asset} updated successfully.`,
                messageStyle: "success"
            })
        );
    } catch (responseError) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to edit the Asset. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
