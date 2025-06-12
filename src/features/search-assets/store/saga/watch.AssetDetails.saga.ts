import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery, fork } from "redux-saga/effects";

import {
    AssetDataNames,
    getAssetDetails,
    getWardrobeBakingDisableReason,
    WardrobeBakingDisableReason
} from "../../services";
import { DETAILS_ASSET_URL } from "urls";
import { assetDetailsLoadingAction, assetDetailsLoadedOkAction, assetDetailsLoadedErrorAction } from "../actions";
import { AssetData } from "features/search-assets/services";
import { Assets, AssetTypes } from "config";
import { checkUserAccess } from "shared/checkUserAccess";
import { expandSpawnPositionSaga } from "./expandSpawnPosition.saga";
import { loadUsersByUploaderAndUpdaterIds } from "./loadUsersByUploaderAndUpdaterIds";

export function* loadAssetSaga(stage: string, asset: AssetDataNames, id: number) {
    const actionParams = { stage, asset, id };
    try {
        if (!Assets[asset as AssetTypes]) throw new Error("Asset not found");

        yield put(assetDetailsLoadingAction(actionParams));

        let result: AssetData[AssetDataNames] = yield call(getAssetDetails, stage, asset, id);

        if (asset === "CharacterSpawnPosition") {
            const [expandedResult]: AssetData[AssetDataNames][] = yield expandSpawnPositionSaga(stage, [result]);
            result = expandedResult;
        }

        if (asset === "Wardrobe") {
            const reason: WardrobeBakingDisableReason = yield getWardrobeBakingDisableReason(stage, id);
            result = { ...result, wardrobeBakingDisableReason: reason };
        }

        yield put(
            assetDetailsLoadedOkAction({
                ...actionParams,
                result
            })
        );
        yield* loadUsersByUploaderAndUpdaterIds(stage, asset, result.id);
    } catch (responseError) {
        yield put(
            assetDetailsLoadedErrorAction({
                ...actionParams,
                error: `Failed to load the Asset Details. ${(responseError as Error).toString()}`
            })
        );
    }
}

export function* watchAssetDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = DETAILS_ASSET_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield fork(loadAssetSaga, urlMatch.params.stage, urlMatch.params.asset, urlMatch.params.id);
    });
}
