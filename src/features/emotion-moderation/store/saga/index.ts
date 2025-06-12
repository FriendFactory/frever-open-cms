import { all } from "redux-saga/effects";

import { watchEmotionsListSaga } from "./watchEmotionsListSaga";
import { watchUpsertEmotionSaga } from "./watchUpsertEmotionSaga";
import { watchEmotionsDetailsSaga } from "./watchEmotionsDetailsSaga";

export function* emotionsSaga() {
    yield all([watchEmotionsListSaga(), watchUpsertEmotionSaga(), watchEmotionsDetailsSaga()]);
}
