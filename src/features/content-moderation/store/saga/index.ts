import { all } from "redux-saga/effects";

import { watchCreatePageDetailsSaga } from "./watchCreatePageDetailsSaga";
import { watchCreatePageListSaga } from "./watchCreatePageListSaga";
import { updateCreatePageContentSaga } from "./updateCreatePageContentSaga";
import { upsertSingleCreatePageRowSaga } from "./upsertSingleCreatePageRowSaga";

export function* createPageSaga() {
    yield all([
        watchCreatePageListSaga(),
        watchCreatePageDetailsSaga(),
        upsertSingleCreatePageRowSaga(),
        updateCreatePageContentSaga()
    ]);
}
