import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";

import { updateBundleVfxAndBodyAnimAction } from "../actions";
import { deleteBundleVfxAndAnim } from "features/search-assets/services/deleteBundleVfxAndAnim";
import { editAssetDetailsWorker } from "./watch.AssetEditDetails.saga";

export function* watchUpdateBundleVfxAndBodyAnim() {
    yield takeEvery(
        updateBundleVfxAndBodyAnimAction.TYPE,
        function* (action: typeof updateBundleVfxAndBodyAnimAction.typeOf.action) {
            const { stage, assetType, id, data, clearTargetId, clearTargetType } = action;
            try {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Update Bundle VFX/BodyAnimation. Pending....`,
                        messageStyle: "loading"
                    })
                );
                //Unbundle target asset
                yield call(deleteBundleVfxAndAnim, stage, clearTargetType, clearTargetId);
                //Unbundle source asset
                yield call(deleteBundleVfxAndAnim, stage, assetType, id);

                yield* editAssetDetailsWorker(stage, assetType, data);

                yield put(
                    addPopUpMessageAction({
                        messageText: `Update Bundle VFX/BodyAnimation. Success.`,
                        messageStyle: "success"
                    })
                );
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to update Bundle VFX/BodyAnimation. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
