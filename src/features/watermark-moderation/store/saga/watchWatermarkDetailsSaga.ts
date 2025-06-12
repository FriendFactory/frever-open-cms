import { spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { WATERMARK_DETAILS_URL } from "urls";
import { loadWatermarkList } from "./watchWatermarkListSaga";

export function* watchWatermarkDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = WATERMARK_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadWatermarkList, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
