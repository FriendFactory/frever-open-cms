import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { spawn, takeEvery } from "redux-saga/effects";

import { MASS_SEND_OUTS_DETAILS_PAGE_URL } from "urls";
import { loadScheduledMessage } from "./watchScheduledMessageListSaga";

export function* watchScheduledMessageDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = MASS_SEND_OUTS_DETAILS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadScheduledMessage, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
