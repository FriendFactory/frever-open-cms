import { LocationChangeAction, LOCATION_CHANGE, RouterLocation } from "connected-react-router";
import { call, spawn, put, takeEvery } from "redux-saga/effects";

import {
    AssetData,
    AssetDataNames,
    AssetListParams,
    AssetOfferType,
    assetsAvailableForOffer
} from "features/search-assets/services";
import { AssetTypes, Assets } from "config";
import { getAssetList } from "../../services";
import { ASSETS_BATCH_MODE_URL, DEFAULT_ASSETS_PAGE_SIZE, SEARCH_ASSET_URL } from "urls";
import { expandSpawnPositionSaga } from "./expandSpawnPosition.saga";

import {
    assetListLoadedOkAction,
    assetListLoadingAction,
    assetListLoadedErrorAction,
    assetListHandleLoadAction
} from "../actions";
import { loadAssetPricesSaga } from "./watch.AssetPrices.saga";
import { checkUserAccess } from "shared/checkUserAccess";
import { UrlPath } from "rd-url-utils";
import { ResultWithCount } from "shared";

export function* watchAssetListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        yield spawn(handleAssetPageLoad, action.payload.location, SEARCH_ASSET_URL, true, true);

        yield spawn(handleAssetPageLoad, action.payload.location, ASSETS_BATCH_MODE_URL);
    });

    yield takeEvery(assetListHandleLoadAction.TYPE, function* (action: typeof assetListHandleLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "AssetRead");
        if (!hasAccess) return;

        const { type, ...restParams } = action;
        yield spawn(loadAssetListSaga, restParams);
    });
}

function* handleAssetPageLoad(
    location: RouterLocation<any>,
    url: UrlPath<{ stage: string; asset: AssetTypes }, AssetListParams>,
    loadWithPrices?: boolean,
    useCompactWardrobeList?: boolean
) {
    const urlMatch = url.match(location, true);
    if (!urlMatch.isMatched) return;

    const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
    if (!hasAccess) return;

    const { stage, asset } = urlMatch.params;
    const params = urlMatch.query || {};

    if (!Object.keys(Assets).some((el) => el.toLocaleLowerCase() === asset.toLocaleLowerCase())) {
        yield put(
            assetListLoadedErrorAction({
                stage,
                asset,
                params,
                error: `This page does not support entities of the ${asset} type`
            })
        );
        return;
    }

    let withPrices = false;
    const count = params.take ?? DEFAULT_ASSETS_PAGE_SIZE;

    if (loadWithPrices && count <= 500) {
        withPrices = assetsAvailableForOffer.some((el) => el !== "Wardrobe" && el === urlMatch.params.asset);
    }

    yield spawn(loadAssetListSaga, { stage, asset, params, withPrices, useCompactWardrobeList });
}

export function* loadAssetListSaga({
    stage,
    asset,
    params,
    expand,
    withPrices,
    useCompactWardrobeList
}: Omit<typeof assetListHandleLoadAction.typeOf.action, "type"> & { withPrices?: boolean }) {
    try {
        yield put(assetListLoadingAction({ stage, asset, params }));

        let result: AssetData[AssetDataNames][] | ResultWithCount<AssetData[AssetDataNames]> = yield call(
            getAssetList,
            stage,
            asset,
            params,
            expand,
            useCompactWardrobeList
        );

        const data = "count" in result ? result.data : result;

        if (asset === "CharacterSpawnPosition") result = yield expandSpawnPositionSaga(stage, data);

        yield put(
            assetListLoadedOkAction({
                stage,
                asset,
                params,
                result: data,
                total: "count" in result ? result.count : undefined
            })
        );

        if (withPrices) {
            yield spawn(
                loadAssetPricesSaga,
                stage,
                asset as AssetOfferType,
                data.map((el) => el.id)
            );
        }
    } catch (responseError) {
        yield put(
            assetListLoadedErrorAction({
                stage,
                asset,
                params,
                error: `Failed to load the Asset List. ${(responseError as Error).toString()}`
            })
        );
    }
}
