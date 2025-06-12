import { all } from "redux-saga/effects";

import { watchThemeCollectionsListSaga } from "./watchThemeCollectionsListSaga";
import { watchThemeCollectionsDetailsSaga } from "./watchThemeCollectionsDetailsSaga";
import { upsertCollectionsSaga } from "./upsertCollectionsSaga";
import { upsertSingleCollectionSaga } from "./upsertSingleCollectionSaga";
import { watchCollectionsByWardrobeSaga } from "./watchCollectionsByWardrobeSaga";
import { updateCollectionWardrobesSaga } from "./updateCollectionWardrobesSaga";

export function* themeCollectionsSaga() {
    yield all([
        watchThemeCollectionsListSaga(),
        watchThemeCollectionsDetailsSaga(),
        upsertCollectionsSaga(),
        upsertSingleCollectionSaga(),
        watchCollectionsByWardrobeSaga(),
        updateCollectionWardrobesSaga()
    ]);
}
