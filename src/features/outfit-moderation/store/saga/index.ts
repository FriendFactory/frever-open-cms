import { all } from "redux-saga/effects";

import { watchOutfitDetailsSaga } from "./watch.OutfitDetails.saga";
import { watchOutfitListSaga } from "./watchOutfitListSaga";
import { watchRemoveOutfitWardrobeSaga } from "./watchRemoveOutfitWardrobeSaga";

export function* outfitSaga() {
    yield all([watchOutfitDetailsSaga(), watchOutfitListSaga(), watchRemoveOutfitWardrobeSaga()]);
}
