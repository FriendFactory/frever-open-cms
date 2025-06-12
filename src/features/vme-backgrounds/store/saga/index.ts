import { all } from "redux-saga/effects";

import { upsertSingleVMEBackgroundSaga } from "./upsertSingleVMEBackgroundSaga";
import { watchVMEBackgroundListSaga } from "./watchVMEBackgroundListSaga";
import { deleteVMEBackgroundSaga } from "./deleteVMEBackgroundSaga";
import { upsertVMEBackgroundSaga } from "./upsertVMEBackgroundSaga";
import { watchVMEBackgroundDetailsSaga } from "./watchVMEBackgroundDetailsSaga";

import { watchBackgroundAIListSaga } from "./BackgroundAI/watchBackgroundAIListSaga";
import { watchBackgroundAIDetailsSaga } from "./BackgroundAI/watchBackgroundAIDetailsSaga";
import { upsertBackgroundAISaga } from "./BackgroundAI/upsertBackgroundAISaga";
import { upsertSingleBackgroundAISaga } from "./BackgroundAI/upsertSingleBackgroundAISaga";
import { watchBackgroundAIMigrationSaga } from "./BackgroundAI/watchBackgroundAIMigrationSaga";
import { watchBackgroundAIPreviewSaga } from "./BackgroundAI/watchBackgroundAIPreviewSaga";

export function* vmeBackgroundSaga() {
    yield all([
        watchVMEBackgroundListSaga(),
        watchVMEBackgroundDetailsSaga(),
        upsertSingleVMEBackgroundSaga(),
        upsertVMEBackgroundSaga(),
        deleteVMEBackgroundSaga()
    ]);
}

export function* backgroundAISaga() {
    yield all([
        watchBackgroundAIListSaga(),
        watchBackgroundAIDetailsSaga(),
        upsertBackgroundAISaga(),
        upsertSingleBackgroundAISaga(),
        watchBackgroundAIMigrationSaga(),
        watchBackgroundAIPreviewSaga()
    ]);
}
