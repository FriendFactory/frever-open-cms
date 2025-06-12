import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { GEO_CLUSTERS_LIST_URL } from "urls";
import { GeoCluster, GeoClustersListQueryParams, getGeoClustersList } from "../../services";
import { checkUserAccess } from "shared/checkUserAccess";
import { ResultWithCount } from "shared";
import {
    geoClustersListLoadingAction,
    geoClustersListLoadedOkAction,
    geoClustersListLoadedErrorAction
} from "../actions/geoClustersList";

export function* watchGeoClustersListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = GEO_CLUSTERS_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        const { stage } = urlMatch.params;
        const params = urlMatch.query || {};

        yield spawn(loadGeoClustersList, stage, params || {});
    });
}

export function* loadGeoClustersList(stage: string, params: GeoClustersListQueryParams) {
    try {
        yield put(geoClustersListLoadingAction({ stage, params }));

        const result: ResultWithCount<GeoCluster> = yield call(getGeoClustersList, stage, params);

        yield put(
            geoClustersListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            geoClustersListLoadedErrorAction({
                error: `Failed to load geo clusters list. ${(responseError as Error).message}`,
                stage,
                params
            })
        );
    }
}
