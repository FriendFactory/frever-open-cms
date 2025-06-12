import { Action } from "redux";

import { AssetDataNames, AssetOfferWithAssetInfo } from "../../../services";
import {
    assetOfferListLoadedOkAction,
    assetOfferLoadedOkAction,
    assetOffersByAssetIdsLoadedAction
} from "../../actions";

export interface AssetOfferState {
    [key: string]: AssetOfferWithAssetInfo;
}

export const assetOfferEntitiesReducer = (state: AssetOfferState | undefined, action: Action): AssetOfferState => {
    if (!state) {
        state = {};
    }

    if (assetOfferLoadedOkAction.is(action)) {
        if (action.result) {
            return {
                ...state,
                [assetOfferKeySelector(action.stage, action.assetOfferType, action.assetId)]: action.result
            };
        }
    }

    if (assetOfferListLoadedOkAction.is(action)) {
        const newAssetOffers = action.result.reduce((acc: AssetOfferState, el) => {
            acc[assetOfferKeySelector(action.stage, el.assetType, el.assetId)] = el;
            return acc;
        }, {});

        return { ...state, ...newAssetOffers };
    }

    if (assetOffersByAssetIdsLoadedAction.is(action)) {
        return action.result.reduce(
            (acc, el) => {
                if (el.data) acc[assetOfferKeySelector(action.stage, action.assetType, el.assetId)] = el.data;
                return acc;
            },
            { ...state }
        );
    }

    return state;
};

export const assetOfferKeySelector = (stage: string, assetType: AssetDataNames, assetId: number) =>
    `${stage}/asset-offer/${assetType}/${assetId}`;
