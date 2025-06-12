import { call, put, takeEvery } from "redux-saga/effects";

import { deleteEntity } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { storageFileDeleteAction } from "../actions";
import { storageFileListPageWorker } from "./watchStorageFileListSaga";

export function* watchStorageFileDeleteSaga() {
    yield takeEvery(storageFileDeleteAction.TYPE, function* (action: typeof storageFileDeleteAction.typeOf.action) {
        try {
            yield call(deleteEntity, action.stage, "storage-file/moderation", action.id);

            yield* storageFileListPageWorker(location);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete storage file. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
