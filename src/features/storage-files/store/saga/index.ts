import { all } from "redux-saga/effects";

import { watchStorageFileDeleteSaga } from "./watchStorageFileDeleteSaga";
import { watchLoadStorageFileList } from "./watchStorageFileListSaga";
import { watchStorageFilePostSaga } from "./watchStorageFilePostSaga";

export function* storageFileSaga() {
    yield all([watchLoadStorageFileList(), watchStorageFilePostSaga(), watchStorageFileDeleteSaga()]);
}
