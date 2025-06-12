import { all, call, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { tagAssetListLoadedOkAction, tagAssetListLoadingAction } from "../actions/tagAssetList";
import { Assets, AssetTypes } from "config";
import { TAG_DETAILS_PAGE_URL } from "urls";
import { loadAssetListSaga } from "features/search-assets/store/saga/watch.AssetList.saga";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchTagAssetListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = TAG_DETAILS_PAGE_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        const { stage, id: tagId } = urlMatch.params;
        const params = { ...urlMatch.query, tagId };

        yield put(tagAssetListLoadingAction({ stage, params }));

        const assetType = urlMatch.query?.assetType;
        const assetsTypesList = assetType?.length
            ? typeof assetType === "string"
                ? [assetType]
                : assetType
            : Object.keys(Assets);

        yield all(
            assetsTypesList.map(function* (assetName) {
                const asset = assetName as AssetTypes;
                if (asset !== "CameraAnimationTemplate") yield* loadAssetListSaga({ stage, asset, params });
            })
        );

        yield put(tagAssetListLoadedOkAction({ stage, params }));
    });
}
