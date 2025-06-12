import { all, call, put, spawn, takeEvery } from "redux-saga/effects";

import { postUniverse } from "features/universe-moderation/services";
import { InitUpload, ThumbnailFile, initUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { upsertSingleUniverseAction } from "../actions";
import { loadUniverseList } from "./watchUniverseListSaga";

const POP_UP_KEY = "UNIVERSE UPDATE";

export function* upsertSingleUniverseSaga() {
    yield takeEvery(
        upsertSingleUniverseAction.TYPE,
        function* (action: typeof upsertSingleUniverseAction.typeOf.action) {
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

                            const newImage = { ...fileInfo, source: { uploadId } } as ThumbnailFile;

                            infexOfItem !== -1 ? (files[infexOfItem] = newImage) : files.push(newImage);
                        })
                    );
                }

                yield call(postUniverse, action.stage, { ...item, files });

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `Universe item "${item.name}" ${actionType}`,
                        key: POP_UP_KEY,
                        duration: 2
                    })
                );
                yield spawn(loadUniverseList, action.stage, { id: action.data.item.id });
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} Universe item (${item.name}). ${(e as Error).message}`
                    })
                );
            }
        }
    );
}
