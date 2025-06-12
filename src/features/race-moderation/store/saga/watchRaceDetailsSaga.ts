import { spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { RACE_DETAILS_URL } from "urls";
import { loadRaceList } from "./watchRaceListSaga";

export function* watchRaceDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = RACE_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadRaceList, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
