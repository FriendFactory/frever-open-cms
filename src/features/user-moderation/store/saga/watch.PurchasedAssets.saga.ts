import { all, call, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getPurchasedAssets, PurchasedAsset, PurchasedAssetsTypes, PurchasedAssetsTypesNames } from "../../services";
import { DEFAULT_PURCHASES_LIST_PAGE_SIZE, USER_ASSET_PURCHASES_TAB_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    purchasedAssetsLoadingAction,
    purchasedAssetsLoadedOkAction,
    purchasedAssetsLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchPurchasedAssetsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = USER_ASSET_PURCHASES_TAB_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetRead");
        if (!hasAccess) return;

        const stage = urlMatch.params.stage;
        const params = urlMatch.query || {};

        const assetType = urlMatch.query?.assetType;
        const assetsTypesList = assetType?.length
            ? typeof assetType === "string"
                ? [assetType]
                : assetType
            : Object.keys(PurchasedAssetsTypes);

        try {
            yield put(purchasedAssetsLoadingAction({ stage, params }));

            const result: PurchasedAsset[][] = yield all(
                assetsTypesList.map(function* (assetType) {
                    const list: PurchasedAsset[] = yield call(
                        getPurchasedAssets,
                        stage,
                        assetType as PurchasedAssetsTypesNames,
                        params
                    );

                    return list;
                })
            );

            const isNextPageAvailable = result.some((el) => el.length === DEFAULT_PURCHASES_LIST_PAGE_SIZE);

            yield put(
                purchasedAssetsLoadedOkAction({
                    stage,
                    params,
                    result: result.flat(),
                    isNextPageAvailable
                })
            );
        } catch (responseError) {
            yield put(
                purchasedAssetsLoadedErrorAction({
                    stage,
                    params,
                    error: (responseError as Error).toString()
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load the User Purchased Asset List. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
