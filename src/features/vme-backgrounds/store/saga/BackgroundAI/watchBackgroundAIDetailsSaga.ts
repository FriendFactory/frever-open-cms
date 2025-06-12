import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { BACKGROUND_AI_DETAILS_URL } from "urls";
import { loadBackgroundAIList } from "./watchBackgroundAIListSaga";

export function* watchBackgroundAIDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = BACKGROUND_AI_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield spawn(loadBackgroundAIList, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
