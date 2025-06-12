import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE, RouterLocation } from "connected-react-router";

import { getStorageFileList, StorageFile, StorageFileListQueryParams } from "features/storage-files/services";
import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { STORAGE_FILE_LIST_URL } from "urls";
import {
    storageFileListLoadingAction,
    storageFileListLoadedOkAction,
    storageFileListLoadedErrorAction,
    storageFileListLoadAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchLoadStorageFileList() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield* storageFileListPageWorker(action.payload.location);
    });

    yield takeEvery(storageFileListLoadAction.TYPE, function* (action: typeof storageFileListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(storageFileListWorker, action.stage, action.params);
    });
}

export function* storageFileListPageWorker(location: Location | RouterLocation<any>) {
    const urlMatch = STORAGE_FILE_LIST_URL.match(location, true);
    if (urlMatch.isMatched) yield spawn(storageFileListWorker, urlMatch.params.stage, urlMatch.query || {});
}

export function* storageFileListWorker(stage: string, params: StorageFileListQueryParams) {
    try {
        yield put(storageFileListLoadingAction({ stage, params }));

        const result: ResultWithCount<StorageFile> = yield call(getStorageFileList, stage, params);

        yield put(storageFileListLoadedOkAction({ stage, params, result }));
    } catch (e) {
        yield put(storageFileListLoadedErrorAction({ stage, params, error: (e as Error).toString() }));

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the storage files. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
