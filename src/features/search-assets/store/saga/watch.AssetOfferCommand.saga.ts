import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { assetOfferLoadedOkAction, executeAssetOfferCommand } from "../actions";
import { deactivateAssetOffer, createAssetOffer } from "../../services";
import { addPopUpMessageAction } from "shared/store";
import { loadAssetOffer } from "./watch.AssetOffer.saga";

export function* watchAssetOfferCommand() {
    yield takeEvery(executeAssetOfferCommand.TYPE, function* (action: typeof executeAssetOfferCommand.typeOf.action) {
        try {
            if (action.command.type === "deactivate") {
                yield call(deactivateAssetOffer, action.stage, action.command.assetOffer.assetOfferId);
                yield put(
                    assetOfferLoadedOkAction({
                        stage: action.stage,
                        assetId: action.command.assetOffer.assetId,
                        assetOfferType: action.command.assetOffer.assetType,
                        result: null
                    })
                );
            } else {
                for (let assetId of action.command.assetIds) {
                    yield call(createAssetOffer, action.stage, { assetId, ...action.command.data });

                    yield spawn(loadAssetOffer, {
                        stage: action.stage,
                        assetId,
                        assetOfferType: action.command.data.assetType as any
                    });
                }
            }

            yield put(
                addPopUpMessageAction({
                    messageText: `Success asset offer command execution "${action.command.type}"`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed command "${action.command.type}". ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
