import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { UMA_BUNDLE_DETAILS_URL } from "urls";
import {
    umaBundleDetailsLoadingAction,
    umaBundleDetailsLoadedOkAction,
    umaBundleDetailsLoadedErrorAction
} from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { getUmaBundleList, UmaBundle } from "features/search-assets/services";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchUmaBundleDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = UMA_BUNDLE_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield loadUmaBundleDetails({ stage: urlMatch.params.stage, id: urlMatch.params.id });
    });
}

export function* loadUmaBundleDetails(params: { stage: string; id: number }) {
    try {
        yield put(umaBundleDetailsLoadingAction(params));

        const [result]: UmaBundle[] = yield call(getUmaBundleList, {
            stage: params.stage,
            params: { id: params.id },
            expand: [
                "umaBundleAllDependencyDependsOnBundle",
                "umaBundleAllDependencyUmaBundle",
                "umaBundleDirectDependencyDependsOnBundle",
                "umaBundleDirectDependencyUmaBundle",
                "wardrobe",
                "umaAsset"
            ]
        });
        if (result) {
            yield put(
                umaBundleDetailsLoadedOkAction({
                    ...params,
                    result
                })
            );
        } else {
            throw new Error("Uma Bundle data is missing");
        }
    } catch (responseError) {
        yield put(
            umaBundleDetailsLoadedErrorAction({
                ...params,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Uma Bundle Details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
