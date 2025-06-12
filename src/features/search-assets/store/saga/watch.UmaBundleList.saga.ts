import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { getUmaBundleList, UmaBudnleListQueryParams, UmaBundle } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";
import { UMA_BUNDLE_SEARCH_URL } from "urls";
import { umaBundleListLoadingAction, umaBundleListLoadedOkAction, umaBundleListLoadedErrorAction } from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* loadUmaBundleList(actionParams: { stage: string; params: UmaBudnleListQueryParams }) {
    try {
        yield put(umaBundleListLoadingAction(actionParams));

        const result: UmaBundle[] = yield call(getUmaBundleList, {
            stage: actionParams.stage,
            params: actionParams.params,
            select: ["id", "assetBundleName", "umaBundleType", "umaBundleTypeId", "readinessId"],
            expand: ["umaBundleType"]
        });

        yield put(
            umaBundleListLoadedOkAction({
                ...actionParams,
                result
            })
        );
    } catch (responseError) {
        yield put(
            umaBundleListLoadedErrorAction({
                error: (responseError as Error).toString(),
                ...actionParams
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Uma Bundle List. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

export function* watchUmaBundleListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = UMA_BUNDLE_SEARCH_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield loadUmaBundleList({ stage: urlMatch.params.stage, params: urlMatch.query || {} });
    });
}
