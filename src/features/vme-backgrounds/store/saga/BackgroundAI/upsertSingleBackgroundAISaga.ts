import { BackgroundAI, createBackgroundAI, updateBackgroundAI } from "features/vme-backgrounds/services";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { InitUpload, ThumbnailFile, initUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { upsertBackgroundAIOkAction, upsertSingleBackgroundAIAction } from "../../actions/BackgroundAI";
import { backgroundAIListPageWorker } from "./watchBackgroundAIListSaga";

const POP_UP_KEY = "AI BACKGROUND UPDATE";

export function* upsertSingleBackgroundAISaga() {
    yield takeEvery(
        upsertSingleBackgroundAIAction.TYPE,
        function* (action: typeof upsertSingleBackgroundAIAction.typeOf.action) {
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
                    yield call(createBackgroundAI, action.stage, {
                        ...item,
                        files
                    } as BackgroundAI);
                    yield* backgroundAIListPageWorker(location);
                } else {
                    const data: BackgroundAI = yield call(updateBackgroundAI, action.stage, {
                        ...item,
                        files
                    } as BackgroundAI);
                    yield put(
                        upsertBackgroundAIOkAction({
                            stage: action.stage,
                            data: [data]
                        })
                    );
                }

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `AI Background item "${item.name}" ${actionType}`,
                        key: POP_UP_KEY
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} AI Background item (${item.name}). ${
                            (e as Error).message
                        }`
                    })
                );
            }
        }
    );
}
