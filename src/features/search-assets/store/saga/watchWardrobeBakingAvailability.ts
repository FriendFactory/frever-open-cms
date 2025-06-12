import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { loadAssetSaga } from "./watch.AssetDetails.saga";
import { postWardrobeBakingAvailability } from "features/search-assets/services";
import { updateWardrobeBakingAvailabilityAction } from "../actions";

export function* watchWardrobeBakingAvailability() {
    yield takeEvery(
        updateWardrobeBakingAvailabilityAction.TYPE,
        function* (action: typeof updateWardrobeBakingAvailabilityAction.typeOf.action) {
            try {
                yield call(postWardrobeBakingAvailability, action.stage, action.data);

                yield spawn(loadAssetSaga, action.stage, "Wardrobe", action.data.wardrobeId);
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update wardrobe baking availability. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
