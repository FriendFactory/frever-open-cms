import { all } from "redux-saga/effects";

import { watchSeasonListSaga } from "./watch.SeasonList.saga";
import { watchSeasonDetailsSaga } from "./watch.SeasonDetails.saga";
import { watchPostSeasonSaga } from "./watch.PostSeason.saga";
import { watchPostSeasonEntitySaga } from "./watch.PostSeasonEntity.saga";
import { watchDeleteSeasonEntitySaga } from "./watch.DeleteSeasonEntity.saga";
import { watchCopySeasonSaga } from "./watchCopySeasonSaga";

export function* seasonsSaga() {
    yield all([
        watchSeasonListSaga(),
        watchSeasonDetailsSaga(),
        watchPostSeasonSaga(),
        watchPostSeasonEntitySaga(),
        watchDeleteSeasonEntitySaga(),
        watchCopySeasonSaga()
    ]);
}
