import { all } from "redux-saga/effects";

import { upsertSingleIntellectualPropertySaga } from "./upsertSingleIntellectualPropertySaga";
import { watchIntellectualPropertyDetailsSaga } from "./watchIntellectualPropertyDetailsSaga";
import { watchIntellectualPropertyListSaga } from "./watchIntellectualPropertyListSaga";

export function* intellectualPropertySaga() {
    yield all([
        watchIntellectualPropertyListSaga(),
        watchIntellectualPropertyDetailsSaga(),
        upsertSingleIntellectualPropertySaga()
    ]);
}
