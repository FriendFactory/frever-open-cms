import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { loadSeasonList } from "features/seasons-moderation/store/saga/watch.SeasonList.saga";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { THEME_COLLECTIONS_DETAILS_URL } from "urls";

import { loadThemeCollections } from "./watchThemeCollectionsListSaga";

export function* watchThemeCollectionsDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = THEME_COLLECTIONS_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadSeasonList, urlMatch.params.stage, {});
        yield spawn(loadThemeCollections, urlMatch.params.stage, { id: urlMatch.params.id });
    });
}
