import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { DETAILS_ASSET_URL } from "urls";

import { loadThemeCollections } from "./watchThemeCollectionsListSaga";

export function* watchCollectionsByWardrobeSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = DETAILS_ASSET_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched || urlMatch.params.asset !== "Wardrobe") return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadThemeCollections, urlMatch.params.stage, { wardrobeId: urlMatch.params.id });
    });
}
