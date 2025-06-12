import { postWatermark } from "features/watermark-moderation/services";
import { all, call, put, spawn, takeEvery } from "redux-saga/effects";

import { InitUpload, ThumbnailFile, initUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { upsertSingleWatermarkAction } from "../actions";
import { loadWatermarkList } from "./watchWatermarkListSaga";

const POP_UP_KEY = "WATERMARK UPDATE";

export function* upsertSingleWatermarkSaga() {
    yield takeEvery(
        upsertSingleWatermarkAction.TYPE,
        function* (action: typeof upsertSingleWatermarkAction.typeOf.action) {
            const { files: sourceFiles, ...item } = action.data.item;

            let files = sourceFiles || [];

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
                                (sourceFile) =>
                                    sourceFile.resolution === el.resolution &&
                                    sourceFile.tags?.find((val) => val === el.tags![0])
                            );

                            const newImage = { ...fileInfo, source: { uploadId } } as ThumbnailFile;

                            const removeNullTags = files.filter((f) => f.tags !== null);
                            files = removeNullTags;

                            infexOfItem !== -1 ? (files[infexOfItem] = newImage) : files.push(newImage);
                        })
                    );
                }

                yield call(postWatermark, action.stage, { ...item, files });

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `Watermark item "${item.name}" ${actionType}`,
                        key: POP_UP_KEY,
                        duration: 2
                    })
                );

                yield spawn(loadWatermarkList, action.stage, { id: action.data.item.id });
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} Watermark item (${item.name}). ${(e as Error).message}`
                    })
                );
            }
        }
    );
}
