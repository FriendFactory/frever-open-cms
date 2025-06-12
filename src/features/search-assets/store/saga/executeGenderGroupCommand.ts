import { call, fork, put, takeEvery } from "redux-saga/effects";

import { assetDetailsLoadedOkAction, executeGenderGroupCommandAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { editAssetDetails, executeGenderGroupCommand, WardrobeAsset } from "features/search-assets/services";
import { loadAssetSaga } from "./watch.AssetDetails.saga";

export function* executeGenderGroupCommandSaga() {
    yield takeEvery(
        executeGenderGroupCommandAction.TYPE,
        function* (action: typeof executeGenderGroupCommandAction.typeOf.action) {
            try {
                if (action.command.type === "exit-from-group") {
                    const result: WardrobeAsset = yield call(editAssetDetails, action.stage, "Wardrobe", {
                        id: action.command.wardrobeId,
                        wardrobeGenderGroupId: null
                    });

                    yield put(
                        assetDetailsLoadedOkAction({
                            stage: action.stage,
                            asset: "Wardrobe",
                            id: result.id,
                            result
                        })
                    );
                } else {
                    yield call(
                        executeGenderGroupCommand,
                        action.stage,
                        action.command.wardrobeId,
                        action.command.genderGroupId
                    );

                    yield fork(loadAssetSaga, action.stage, "Wardrobe", action.command.wardrobeId);
                }
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed ${action.command.type}. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
