import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { EMOTIONS_DETAILS_URL } from "urls";
import { loadEmotions } from "./watchEmotionsListSaga";

export function* watchEmotionsDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EMOTIONS_DETAILS_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadEmotions, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
