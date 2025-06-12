import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { updateAssetEmotionsAction } from "../actions";
import { loadEmotionAssetList } from "./watchEmotionAssetListSaga";
import { editAssetDetails } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";

export function* watchUpdateAssetEmotionSaga() {
    yield takeEvery(updateAssetEmotionsAction.TYPE, function* (action: typeof updateAssetEmotionsAction.typeOf.action) {
        try {
            yield call(editAssetDetails, action.stage, action.asset, action.value);

            yield spawn(loadEmotionAssetList, action.stage, action.emotionId, action.params);
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update asset emotions list. ${(e as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
