import { all } from "redux-saga/effects";

import { watchDeleteHashtagSaga } from "./watch.DeleteHashtag.saga";
import { watchHashtagListSaga } from "./watch.HashtagList.saga";
import { watchUpdateHashtagSaga } from "./watch.UpdateHashtag.saga";
import { watchUpdateSortOrderSaga } from "./watch.UpdateSortOrder.saga";

export function* hashtagSaga() {
    yield all([watchHashtagListSaga(), watchUpdateHashtagSaga(), watchDeleteHashtagSaga(), watchUpdateSortOrderSaga()]);
}
