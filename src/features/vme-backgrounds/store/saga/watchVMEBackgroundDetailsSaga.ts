import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { VME_BACKGROUND_DETAILS_URL } from "urls";
import { loadVMEBackgroundList } from "./watchVMEBackgroundListSaga";

export function* watchVMEBackgroundDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = VME_BACKGROUND_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield spawn(loadVMEBackgroundList, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
