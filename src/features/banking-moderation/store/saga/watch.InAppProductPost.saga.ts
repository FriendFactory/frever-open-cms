import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { postEntity, ThumbnailFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { InAppProduct } from "features/banking-moderation/services";
import { IN_APP_PRODUCT_LIST_URL } from "urls";
import { inAppProductInfoLoadedOkAction, inAppProductPostAction } from "../actions";
import { loadInAppProductListSaga } from "./watch.InAppProductList.saga";
import { handleInAppProductFiles } from "./handleInAppProductFiles.saga";

export function* watchInAppProductPostSaga() {
    yield takeEvery(inAppProductPostAction.TYPE, function* (action: typeof inAppProductPostAction.typeOf.action) {
        try {
            const data: Partial<InAppProduct> & { files?: ThumbnailFile[] } = { ...action.data };

            if (action.thumbnails) {
                data.files = yield* handleInAppProductFiles(action.stage, action.thumbnails, action.data.files);
            }

            if (data.files?.length === 0) {
                // We can get empty files array FROM the backend but when we send an empty files array TO the backend we get a validation error. So we need to replace it with "null" value
                data.files = null as any;
            }

            const result: InAppProduct = yield call(postEntity, action.stage, "in-app-purchase/product", data);

            yield put(
                inAppProductInfoLoadedOkAction({
                    stage: action.stage,
                    id: result.id,
                    result
                })
            );

            if (!data.id) {
                const urlMatch = IN_APP_PRODUCT_LIST_URL.match(location, true);
                if (urlMatch.isMatched)
                    yield spawn(loadInAppProductListSaga, urlMatch.params.stage, urlMatch.query || {});
            }
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to post in-app product entity. ${(e as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
