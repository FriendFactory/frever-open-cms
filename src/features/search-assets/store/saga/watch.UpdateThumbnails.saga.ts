import { call, fork, put, takeEvery } from "redux-saga/effects";

import { AssetData, AssetDataNames, editAssetDetails } from "../../services";
import { assetDetailsLoadedOkAction, updateAssetThumbnailAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { Assets, AssetTypes } from "config";
import { initUpload, InitUpload, ThumbnailFile, uploadFile } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { loadAssetSaga } from "./watch.AssetDetails.saga";

export function* watchUpdateThumbnailSaga() {
    yield takeEvery(
        updateAssetThumbnailAction.TYPE,
        function* (action: typeof updateAssetThumbnailAction.typeOf.action) {
            try {
                const { uploadUrl, uploadId }: InitUpload = yield call(initUpload, action.stage);

                yield call(uploadFile, uploadUrl, action.data);

                const newImageFile: ThumbnailFile = {
                    file: 1,
                    extension: action.info.extension,
                    resolution: action.info.resolution,
                    version: null,
                    source: {
                        uploadId
                    }
                };

                const result: AssetData[AssetTypes] = yield call(editAssetDetails, action.stage, action.asset, {
                    id: action.info.id,
                    files: [newImageFile]
                });

                if (Object.keys(Assets).includes(action.asset)) {
                    yield put(
                        assetDetailsLoadedOkAction({
                            stage: action.stage,
                            asset: action.asset as AssetDataNames,
                            id: result.id,
                            result
                        })
                    );
                } else {
                    const detailsUrlMatch = DETAILS_ASSET_URL.match(location, true);

                    if (detailsUrlMatch.isMatched) {
                        yield fork(
                            loadAssetSaga,
                            detailsUrlMatch.params.stage,
                            detailsUrlMatch.params.asset,
                            detailsUrlMatch.params.id
                        );
                    }
                }

                yield put(
                    addPopUpMessageAction({
                        messageText: `${action.asset} thumbnail updated successfully.`,
                        messageStyle: "success"
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update the ${action.asset} thumbnail. ${(
                            responseError as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
