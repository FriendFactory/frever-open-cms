import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { loadAssetSaga } from "./watch.AssetDetails.saga";

import { deleteBundleVfxAndBodyAnimAction } from "../actions";
import { deleteBundleVfxAndAnim } from "features/search-assets/services/deleteBundleVfxAndAnim";

export function* watchDeleteBundleVfxAndBodyAnim() {
    yield takeEvery(
        deleteBundleVfxAndBodyAnimAction.TYPE,
        function* (action: typeof deleteBundleVfxAndBodyAnimAction.typeOf.action) {
            const { stage, assetType, id } = action;
            try {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Delete Bundle VFX/BodyAnimation. Pending....`,
                        messageStyle: "loading"
                    })
                );

                yield call(deleteBundleVfxAndAnim, stage, assetType, id);

                yield spawn(loadAssetSaga, stage, assetType, id);

                yield put(
                    addPopUpMessageAction({
                        messageText: `Delete Bundle VFX/BodyAnimation. Success.`,
                        messageStyle: "success"
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to delete Bundle VFX/BodyAnimation. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
