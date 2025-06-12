import { spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { CREATE_PAGE_DETAILS_URL } from "urls";
import { loadCreatePageRows } from "./watchCreatePageListSaga";

export function* watchCreatePageDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREATE_PAGE_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadCreatePageRows, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
