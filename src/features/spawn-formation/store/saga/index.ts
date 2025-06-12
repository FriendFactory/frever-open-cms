import { all } from "redux-saga/effects";

import { watchSpawnFormationListSaga } from "./watchSpawnFormationListSaga";
import { watchUpdateSpawnFormationSaga } from "./watchUpdateSpawnFormationSaga";

export function* spawnFormationSaga() {
    yield all([watchSpawnFormationListSaga(), watchUpdateSpawnFormationSaga()]);
}
