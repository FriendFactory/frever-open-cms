import { all } from "redux-saga/effects";

import { watchUniverseDetailsSaga } from "./watchUniverseDetailsSaga";
import { watchUniverseListSaga } from "./watchUniverseListSaga";
import { upsertSingleUniverseSaga } from "./upsertSingleUniverseSaga";

export function* universeSaga() {
    yield all([watchUniverseListSaga(), watchUniverseDetailsSaga(), upsertSingleUniverseSaga()]);
}
