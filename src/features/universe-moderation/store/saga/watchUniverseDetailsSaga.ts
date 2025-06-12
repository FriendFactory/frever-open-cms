import { spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { UNIVERSE_DETAILS_URL } from "urls";
import { loadUniverseList } from "./watchUniverseListSaga";

export function* watchUniverseDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = UNIVERSE_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadUniverseList, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
