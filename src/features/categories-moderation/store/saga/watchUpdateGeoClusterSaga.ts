import { call, put, takeEvery } from "redux-saga/effects";

import { updateGeoCluster } from "features/categories-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import { executeUpdateGeoClusterAction, updateGeoClusterFinishedOkAction } from "../actions";

export function* watchUpdateGeoClusterSaga() {
    yield takeEvery(
        executeUpdateGeoClusterAction.TYPE,
        function* (action: typeof executeUpdateGeoClusterAction.typeOf.action) {
            const { stage, id, data } = action;
            try {
                yield call(updateGeoCluster, stage, id, data);

                yield put(
                    addPopUpMessageAction({
                        messageText: "Geo cluster has been updated",
                        messageStyle: "success"
                    })
                );

                yield put(updateGeoClusterFinishedOkAction({ stage, id, data }));
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update geo cluster details. ${(responseError as Error).message}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
