import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { createGeoClusterAction } from "../actions";
import { postEntity } from "shared";
import { GEO_CLUSTERS_LIST_URL } from "urls";
import { loadGeoClustersList } from "./watchGeoClustersListSaga";

export function* watchCreateGeoClusterSaga() {
    yield takeEvery(createGeoClusterAction.TYPE, function* (action: typeof createGeoClusterAction.typeOf.action) {
        const { stage, data } = action;
        try {
            yield call(postEntity, stage, "geo-cluster", data);

            yield put(
                addPopUpMessageAction({
                    messageText: "New geo cluster has been created",
                    messageStyle: "success"
                })
            );

            const listUrlMatch = GEO_CLUSTERS_LIST_URL.match(location, true);
            if (listUrlMatch.isMatched) {
                yield spawn(loadGeoClustersList, stage, listUrlMatch.query || {});
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to create new geo cluster details. ${(responseError as Error).message}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
