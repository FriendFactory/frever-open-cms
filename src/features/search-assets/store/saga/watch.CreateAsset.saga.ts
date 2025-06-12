import { all, call, put, takeEvery } from "redux-saga/effects";

import { assetDetailsLoadedOkAction, createAssetAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { DETAILS_ASSET_URL, SEARCH_ASSET_URL } from "urls";
import { AssetData } from "features/search-assets/services";
import { InitUpload, initUpload, ThumbnailFile, uploadFile } from "shared";
import { FileExtensions } from "config";
import { postEntity } from "shared/services";
import { loadAssetListSaga } from "./watch.AssetList.saga";

export function* watchCreateAssetSaga() {
    yield takeEvery(createAssetAction.TYPE, function* (action: typeof createAssetAction.typeOf.action) {
        const messageKey = `Create${action.asset}`;

        const { stage, asset, data, imageFiles, files } = action;

        try {
            // Upload image and create image file list
            const imageFileUploadMap = imageFiles.map(function* (entity) {
                try {
                    const { uploadUrl, uploadId }: InitUpload = yield call(initUpload, stage);

                    yield call(uploadFile, uploadUrl, entity.file);

                    const newImageFile = {
                        file: 1,
                        extension: entity.extension,
                        resolution: entity.resolution,
                        source: {
                            uploadId
                        }
                    };

                    return newImageFile;
                } catch (responseError) {
                    yield put(
                        addPopUpMessageAction({
                            messageText: `Failed to upload file. ${(responseError as Error).toString()}`,
                            messageStyle: "error"
                        })
                    );
                    return;
                }
            });

            const thumbnailFiles: ThumbnailFile[] = yield all(imageFileUploadMap);

            //Upload files and create a new Asset(s)
            const assetCreationMap = files.map(function* (entity) {
                try {
                    const { uploadUrl, uploadId }: InitUpload = yield call(initUpload, stage);

                    yield call(uploadFile, uploadUrl, entity.file);

                    const files = [
                        ...thumbnailFiles,
                        {
                            file: 0,
                            extension: entity.extension,
                            resolution: entity.resolution,
                            source: {
                                uploadId
                            }
                        }
                    ];

                    //Get name and size from the file
                    const { size, name } = entity.file;
                    const assetName = name.slice(
                        0,
                        name.search("." + FileExtensions[entity.extension].toLowerCase()) ?? name.length
                    );

                    const result: AssetData[typeof asset] = yield call(postEntity, stage, asset, {
                        name: assetName,
                        size,
                        files,
                        ...data
                    });

                    yield put(
                        assetDetailsLoadedOkAction({
                            stage: stage,
                            asset: asset,
                            id: result.id,
                            result
                        })
                    );

                    return result.id;
                } catch (responseError) {
                    yield put(
                        addPopUpMessageAction({
                            messageText: `Failed to upload file. ${(responseError as Error).toString()}`,
                            messageStyle: "error",
                            key: messageKey
                        })
                    );
                    return;
                }
            });

            yield put(
                addPopUpMessageAction({
                    messageText: `Please wait... Processing ${asset} asset(s) creation. Don't close the tab. This will break off the creation process`,
                    messageStyle: "loading",
                    key: messageKey,
                    duration: 0
                })
            );

            const result: number[] = yield all(assetCreationMap);

            yield put(
                addPopUpMessageAction({
                    messageText: `${asset} asset(s) created.`,
                    messageStyle: "success",
                    key: messageKey,
                    link:
                        result.length > 1
                            ? SEARCH_ASSET_URL.format({ stage, asset })
                            : DETAILS_ASSET_URL.format({ stage, asset, id: result[0] })
                })
            );

            const searchPageUrlMatch = SEARCH_ASSET_URL.match(location);
            if (searchPageUrlMatch.isMatched) {
                yield* loadAssetListSaga({ stage, asset, params: searchPageUrlMatch.query || {} });
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to create a new ${asset} assets. ${(responseError as Error).toString()}`,
                    messageStyle: "error",
                    key: messageKey
                })
            );
        }
    });
}
