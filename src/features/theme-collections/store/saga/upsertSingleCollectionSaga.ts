import { all, call, put, spawn, takeEvery } from "redux-saga/effects";

import { upsertCollectionsOkAction, upsertSingleCollectionAction } from "../actions";
import { InitUpload, ThumbnailFile, initUpload, uploadFile } from "shared";
import { transformThemeCollection } from "./upsertCollectionsSaga";
import { postThemeCollection } from "features/theme-collections/services/postThemeCollection";
import { ThemeCollection } from "features/theme-collections/services";
import { addPopUpMessageAction } from "shared/store";
import { DETAILS_ASSET_URL, THEME_COLLECTIONS_DETAILS_URL } from "urls";
import { loadThemeCollections } from "./watchThemeCollectionsListSaga";

const POP_UP_KEY = "THEME COLLECTION UPDATE";

export function* upsertSingleCollectionSaga() {
    yield takeEvery(
        upsertSingleCollectionAction.TYPE,
        function* (action: typeof upsertSingleCollectionAction.typeOf.action) {
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

                const result: ThemeCollection = yield call(
                    postThemeCollection,
                    action.stage,
                    transformThemeCollection({ ...item, files })
                );

                const urlMatch = DETAILS_ASSET_URL.match(location);
                if (urlMatch.isMatched) {
                    yield spawn(loadThemeCollections, urlMatch.params.stage, { wardrobeId: urlMatch.params.id });
                }

                yield put(
                    addPopUpMessageAction({
                        messageStyle: "success",
                        messageText: `Theme collection item "${item.name}" ${actionType}`,
                        key: POP_UP_KEY,
                        duration: 2,
                        link:
                            actionType === "created"
                                ? THEME_COLLECTIONS_DETAILS_URL.format({ stage: action.stage, id: result.id })
                                : undefined
                    })
                );

                yield put(
                    upsertCollectionsOkAction({
                        stage: action.stage,
                        data: [result]
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageStyle: "error",
                        key: POP_UP_KEY,
                        duration: 5,
                        messageText: `Failed to ${actionType} theme collection item (${item.name}). ${
                            (e as Error).message
                        }`
                    })
                );
            }
        }
    );
}
