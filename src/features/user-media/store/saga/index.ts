import { all } from "redux-saga/effects";

import { watchUpdateUserModuleFileSaga } from "./watch.UpdateUserModuleFile.saga";
import { watchUpdateUserModuleEntitySaga } from "./watch.UpdateUserModuleEntity.saga";
import { watchLoadUserMediaFile } from "./watchLoadUserMediaFileSaga";
import { watchLoadUserMediaFileListSaga } from "./watchLoadUserMediaFileListSaga";
import { watchDeleteAssociatedVideosSaga } from "./watchDeleteAssociatedVideosSaga";

export function* userMediaFilesSaga() {
    yield all([
        watchLoadUserMediaFile(),
        watchUpdateUserModuleEntitySaga(),
        watchUpdateUserModuleFileSaga(),
        watchLoadUserMediaFileListSaga(),
        watchDeleteAssociatedVideosSaga()
    ]);
}
