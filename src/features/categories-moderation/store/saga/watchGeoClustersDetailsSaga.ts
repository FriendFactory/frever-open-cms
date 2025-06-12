import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { GEO_CLUSTER_DETAILS_URL } from "urls";
import { GeoCluster, getGeoClustersList } from "../../services";
import { checkUserAccess } from "shared/checkUserAccess";
import { ResultWithCount } from "shared";
import {
    geoClustersDetailsLoadingAction,
    geoClustersDetailsLoadedOkAction,
    geoClustersDetailsLoadedErrorAction
} from "../actions/geoClustersDetails";

export function* watchGeoClustersDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = GEO_CLUSTER_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        yield spawn(loadGeoClusterDetails, stage, id);
    });
}

export function* loadGeoClusterDetails(stage: string, id: number) {
    try {
        yield put(geoClustersDetailsLoadingAction({ stage, id }));

        const list: ResultWithCount<GeoCluster> = yield call(getGeoClustersList, stage, { id });

        const result = list.data.find((el) => el.id === +id);

        if (!result) {
            throw new Error(`Geo Cluster with ID ${id} not found`);
        }

        yield put(
            geoClustersDetailsLoadedOkAction({
                stage,
                id,
                result
            })
        );
    } catch (responseError) {
        yield put(
            geoClustersDetailsLoadedErrorAction({
                error: `Failed. ${(responseError as Error).message}`,
                stage,
                id
            })
        );
    }
}
