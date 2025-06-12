import { getExpandedData } from "../../services";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    expandedDataAction,
    expandedDataLoadedOkAction,
    expandedDataLoadedErrorAction,
    expandedDataCleanStatus
} from "../actions";

export function* watchExpandDataSaga() {
    yield takeEvery(expandedDataAction.TYPE, function* (action: typeof expandedDataAction.typeOf.action) {
        const { stage, assetType, ids, expandData } = action;
        try {
            const result: string = yield call(getExpandedData, { stage, assetType, ids, expandData });
            yield put(
                expandedDataLoadedOkAction({
                    stage,
                    assetType,
                    ids,
                    expandData,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                expandedDataLoadedErrorAction({
                    stage,
                    assetType,
                    ids,
                    expandData,
                    error: (responseError as Error).toString()
                })
            );
        }

        yield put(expandedDataCleanStatus({ stage, assetType, ids, expandData }));
    });
}
