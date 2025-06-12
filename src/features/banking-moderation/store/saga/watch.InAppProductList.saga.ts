import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { IN_APP_PRODUCT_LIST_URL } from "urls";
import { InAppProduct, getInAppProducts, InAppProductsQueryParams } from "features/banking-moderation/services";
import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import {
    inAppProductListLoadingAction,
    inAppProductListLoadedOkAction,
    inAppProductListLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchInAppProductListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = IN_APP_PRODUCT_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Banking");
        if (!hasAccess) return;

        yield spawn(loadInAppProductListSaga, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadInAppProductListSaga(stage: string, params: InAppProductsQueryParams) {
    try {
        yield put(inAppProductListLoadingAction({ stage, params }));

        const result: ResultWithCount<InAppProduct> = yield call(getInAppProducts, stage, params);

        yield put(
            inAppProductListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (e) {
        yield put(
            inAppProductListLoadedErrorAction({
                error: (e as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load in-app-product list. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
