import { all } from "redux-saga/effects";

import { watchLootBoxListSaga } from "./watchLootBoxListSaga";

export function* lootBoxSaga() {
    yield all([watchLootBoxListSaga()]);
}
