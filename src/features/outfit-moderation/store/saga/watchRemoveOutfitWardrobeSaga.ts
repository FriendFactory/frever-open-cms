import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { editAssetDetails } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";

import { removeOutfitWardrobeAction } from "../actions";
import { loadOutfitDetails } from "./watch.OutfitDetails.saga";

export function* watchRemoveOutfitWardrobeSaga() {
    yield takeEvery(
        removeOutfitWardrobeAction.TYPE,
        function* (action: typeof removeOutfitWardrobeAction.typeOf.action) {
            try {
                const data = {
                    id: action.wardrobeId,
                    outfitAndWardrobe: [
                        {
                            outfitId: -action.outfitId
                        }
                    ]
                };

                yield call(editAssetDetails, action.stage, "Wardrobe", data);

                yield spawn(loadOutfitDetails, action.stage, action.outfitId);
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to remove the outfit from the wardrobe. ${(
                            responseError as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
