import { call, put, takeEvery } from "redux-saga/effects";

import { getUmaBundleList, UmaBundle } from "features/search-assets/services";
import {
    umaBundlesByTIdLoadAction,
    umaBundlesByTIdLoadedErrorAction,
    umaBundlesByTIdLoadedOkAction,
    umaBundlesByTIdLoadingAction
} from "..";

export function* watchUmaBundlesByTIdSaga() {
    yield takeEvery(umaBundlesByTIdLoadAction.TYPE, function* (action: typeof umaBundlesByTIdLoadAction.typeOf.action) {
        try {
            yield put(umaBundlesByTIdLoadingAction({ stage: action.stage, umaBundleTypeId: action.umaBundleTypeId }));

            const result: UmaBundle[] = yield call(getUmaBundleList, {
                stage: action.stage,
                params: {
                    ...action.params,
                    umaBundleTypeId: action.umaBundleTypeId
                },
                select: [
                    "id",
                    "assetBundleName",
                    "umaBundleAllDependencyDependsOnBundle",
                    "umaBundleDirectDependencyDependsOnBundle"
                ],
                expand: ["umaBundleAllDependencyDependsOnBundle", "umaBundleDirectDependencyDependsOnBundle"]
            });

            yield put(
                umaBundlesByTIdLoadedOkAction({
                    stage: action.stage,
                    umaBundleTypeId: action.umaBundleTypeId,
                    result
                })
            );
        } catch (responseError: any) {
            yield put(
                umaBundlesByTIdLoadedErrorAction({
                    stage: action.stage,
                    umaBundleTypeId: action.umaBundleTypeId,
                    error: responseError
                })
            );
        }
    });
}

