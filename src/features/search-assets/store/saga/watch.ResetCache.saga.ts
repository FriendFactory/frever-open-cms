import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { resetStageCache } from "../../services";
import { resetCacheAction } from "../actions";

export function* resetAssetStageCacheSaga() {
    yield takeEvery(resetCacheAction.TYPE, function* (action: typeof resetCacheAction.typeOf.action) {
        try {
            yield call(resetStageCache, action.assetStageId);
        } catch (error) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to reset the Asset Stage Cache. ${(error as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
