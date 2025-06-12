import { spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { INTELLECTUAL_PROPERTY_DETAILS_URL } from "urls";
import { loadIntellectualPropertyList } from "./watchIntellectualPropertyListSaga";

export function* watchIntellectualPropertyDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = INTELLECTUAL_PROPERTY_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadIntellectualPropertyList, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
