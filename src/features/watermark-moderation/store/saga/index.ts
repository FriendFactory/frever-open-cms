import { all } from "redux-saga/effects";

import { watchWatermarkListSaga } from "./watchWatermarkListSaga";
import { watchWatermarkDetailsSaga } from "./watchWatermarkDetailsSaga";
import { upsertSingleWatermarkSaga } from "./upsertSingleWatermarkSaga";

export function* watermarkSaga() {
    yield all([watchWatermarkListSaga(), watchWatermarkDetailsSaga(), upsertSingleWatermarkSaga()]);
}
