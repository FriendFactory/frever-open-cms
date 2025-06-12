import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { IN_APP_PRODUCT_INFO_URL } from "urls";
import { InAppProduct, getInAppProductInfo } from "features/banking-moderation/services";
import { addPopUpMessageAction } from "shared/store";
import {
    inAppProductInfoLoadingAction,
    inAppProductInfoLoadedOkAction,
    inAppProductInfoLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchInAppProductInfoSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = IN_APP_PRODUCT_INFO_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Banking");
        if (!hasAccess) return;

        const actionParams = { stage: urlMatch.params.stage, id: urlMatch.params.id };

        try {
            yield put(inAppProductInfoLoadingAction(actionParams));

            const result: InAppProduct = yield call(getInAppProductInfo, actionParams.stage, actionParams.id);

            yield put(
                inAppProductInfoLoadedOkAction({
                    ...actionParams,
                    result
                })
            );
        } catch (e) {
            yield put(
                inAppProductInfoLoadedErrorAction({
                    error: (e as Error).toString(),
                    ...actionParams
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load in-app-product info. ${(e as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
