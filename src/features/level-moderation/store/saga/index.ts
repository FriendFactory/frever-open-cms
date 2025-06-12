import { all } from "redux-saga/effects";

import { watchLevelListSaga } from "./watchLevelListSaga";
import { watchLevelDetailsSaga } from "./watchLevelDetailsSaga";
import { watchEventDetailsSaga } from "./watchEventDetailsSaga";
import { watchEditLevelSaga } from "./watchEditLevelSaga";

export function* levelSaga() {
    yield all([watchLevelListSaga(), watchLevelDetailsSaga(), watchEventDetailsSaga(), watchEditLevelSaga()]);
}
