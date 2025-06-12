import { call, put, select, takeEvery } from "redux-saga/effects";

import { AppState } from "app-state";
import { postEntity, ThumbnailFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { InAppProductDetails } from "features/banking-moderation/services";
import { inAppProductDetailsPostAction, inAppProductInfoLoadedOkAction } from "../actions";
import { inAppProductInfoPageSelector } from "../reducer";
import { handleInAppProductFiles } from "./handleInAppProductFiles.saga";

export function* watchInAppProductDetailsPostSaga() {
    yield takeEvery(
        inAppProductDetailsPostAction.TYPE,
        function* (action: typeof inAppProductDetailsPostAction.typeOf.action) {
            try {
                const data: Partial<InAppProductDetails> & { files?: ThumbnailFile[] } = { ...action.data };

                if (action.thumbnails) {
                    data.files = yield* handleInAppProductFiles(action.stage, action.thumbnails, action.data.files);
                }

                const inAppProductDetails: InAppProductDetails = yield call(
                    postEntity,
                    action.stage,
                    "in-app-purchase/product-details",
                    data
                );

                const appState: AppState = yield select();
                const { data: inAppProduct } = inAppProductInfoPageSelector(
                    action.stage,
                    inAppProductDetails.inAppProductId
                )(appState);

                if (inAppProduct?.productDetails) {
                    let isItemUpdated = false;

                    inAppProduct.productDetails = inAppProduct.productDetails.map((el) => {
                        if (el.id === inAppProductDetails.id) {
                            isItemUpdated = true;
                            return inAppProductDetails;
                        }
                        return el;
                    });

                    if (!isItemUpdated) {
                        inAppProduct.productDetails = [...inAppProduct.productDetails, inAppProductDetails];
                    }

                    yield put(
                        inAppProductInfoLoadedOkAction({
                            stage: action.stage,
                            id: inAppProduct.id,
                            result: inAppProduct
                        })
                    );
                }
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to post in-app product details entity. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
