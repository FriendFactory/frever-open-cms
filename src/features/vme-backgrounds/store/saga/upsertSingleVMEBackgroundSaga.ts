import { all, call, put, takeEvery } from "redux-saga/effects";

import { upsertSingleVMEBackgroundAction, upsertVMEBackgroundOkAction } from "../actions";
import { InitUpload, ThumbnailFile, initUpload, uploadFile } from "shared";

import { addPopUpMessageAction } from "shared/store";
import { updateVMEBackground, VMEBackground } from "features/vme-backgrounds/services";
import { vmeBackgroundListPageWorker } from "./watchVMEBackgroundListSaga";
import { createVMEBackground } from "features/vme-backgrounds/services/createVMEBackground";

const POP_UP_KEY = "VME BACKGROUND UPDATE";

export function* upsertSingleVMEBackgroundSaga() {
    yield takeEvery(
        upsertSingleVMEBackgroundAction.TYPE,
        function* (action: typeof upsertSingleVMEBackgroundAction.typeOf.action) {
            const { files: sourceFiles, ...item } = action.data.item;

            const files = sourceFiles || [];

            const actionType = "id" in item ? "updated" : "created";

            try {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "loading",
                        messageText: "Pending...",
                        key: POP_UP_KEY,
                        duration: 0
                    })
                );

                if (action.data.newImages) {
                    yield all(
                        action.data.newImages.map(function* (el) {
                            const { newFile, ...fileInfo } = el;

                            const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, action.stage);

                            yield call(uploadFile, uploadUrl, newFile);

                            const infexOfItem = files.findIndex(
                                (sourceFile) => sourceFile.resolution === el.resolution
                            );

                            const newImage = {
                                ...fileInfo,
                                file: fileInfo.resolution === "128x128" ? 1 : 0,
                                resolution: fileInfo.resolution === "128x128" ? fileInfo.resolution : null,
                                source: { uploadId }
                            } as ThumbnailFile;

                            infexOfItem !== -1 ? (files[infexOfItem] = newImage) : files.push(newImage);
                        })
                    );
                }

                if (actionType === "created") {
                    yield call(createVMEBackground, action.stage, {
                        ...item,
                        files
                    } as VMEBackground);
                    yield* vmeBackgroundListPageWorker(location);
                } else {
                    const data: VMEBackground = yield call(updateVMEBackground, action.stage, {
                        ...item,
                        files
                    } as VMEBackground);
                    yield put(
                        upsertVMEBackgroundOkAction({
                            stage: action.stage,
                            data: [data]
                        })
                    );
                }

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `VME Background item "${item.name}" ${actionType}`,
                        key: POP_UP_KEY
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} VME Background item (${item.name}). ${
                            (e as Error).message
                        }`
                    })
                );
            }
        }
    );
}
