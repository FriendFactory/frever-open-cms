import { call, put, takeEvery } from "redux-saga/effects";

import { editUmaAssetAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { editAssetDetails } from "../../services";
import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { loadUmaBundleDetails } from "./watch.UmaBundleDetails.saga";

export function* watchEditUmaAssetSaga() {
    yield takeEvery(editUmaAssetAction.TYPE, function* (action: typeof editUmaAssetAction.typeOf.action) {
        try {
            yield call(editAssetDetails, action.stage, "umaAsset", action.data);

            yield put(
                addPopUpMessageAction({
                    messageText: `UmaAsset updated successfully.`,
                    messageStyle: "success"
                })
            );

            const urlMatch = UMA_BUNDLE_DETAILS_URL.match(location, true);
            if (urlMatch.isMatched) {
                yield loadUmaBundleDetails({ stage: urlMatch.params.stage, id: urlMatch.params.id });
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to edit the UmaAsset. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

