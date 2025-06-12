import { call, put, takeEvery } from "redux-saga/effects";

import { editAssetDetails, SongAsset } from "features/search-assets/services";
import { InitUpload, initUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { assetDetailsLoadedOkAction, updateAssetSongAction } from "../actions";

export function* watchUpdateSongSaga() {
    yield takeEvery(updateAssetSongAction.TYPE, function* (action: typeof updateAssetSongAction.typeOf.action) {
        try {
            const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, action.stage);

            yield call(uploadFile, uploadUrl, action.data);

            const newAudioFile = {
                file: 0,
                extension: action.info.extension,
                version: null,
                source: {
                    uploadId
                }
            };

            const result: SongAsset = yield call(editAssetDetails, action.stage, action.asset, {
                id: action.info.id,
                files: [newAudioFile]
            });

            yield put(
                assetDetailsLoadedOkAction({
                    stage: action.stage,
                    asset: action.asset,
                    id: result.id,
                    result
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `${action.asset} audio updated successfully.`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update the ${action.asset} audio. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
