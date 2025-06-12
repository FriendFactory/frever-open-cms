import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";
import { THEME_COLLECTIONS_LIST_URL } from "urls";
import {
    collectionsListLoadAction,
    collectionsListLoadedErrorAction,
    collectionsListLoadedOkAction,
    collectionsListLoadingAction
} from "../actions";
import {
    ThemeCollection,
    ThemeCollectionsQueryParams,
    getThemeCollectionList
} from "features/theme-collections/services";
import { loadSeasonList } from "features/seasons-moderation/store/saga/watch.SeasonList.saga";

export function* watchThemeCollectionsListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = THEME_COLLECTIONS_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;
        yield spawn(loadSeasonList, urlMatch.params.stage, {});
        yield spawn(loadThemeCollections, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(collectionsListLoadAction.TYPE, function* (action: typeof collectionsListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield spawn(loadThemeCollections, action.stage, action.params);
    });
}

export function* loadThemeCollections(stage: string, params: ThemeCollectionsQueryParams) {
    try {
        yield put(collectionsListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<ThemeCollection> = yield call(getThemeCollectionList, stage, params);

        yield put(collectionsListLoadedOkAction({ stage, params, data, total: count }));
    } catch (e) {
        yield put(
            collectionsListLoadedErrorAction({
                stage,
                params,
                error: `Failed to load theme collections list. ${(e as Error).message}`
            })
        );
    }
}
