import { AppState } from "app-state";
import { AssetOfferWithAssetInfo } from "features/search-assets/services";
import { Action } from "redux";

import {
    assetOfferListActionGroup,
    assetOfferListLoadingAction,
    assetOfferListLoadedOkAction,
    assetOfferListLoadedErrorAction
} from "../../actions";
import { assetOfferKeySelector } from "./assetOfferEntities.reducer";

export interface AssetOfferListState {
    loading: boolean;
    error?: string;
    byId?: string[];
}

export const assetOfferListReducer = assetOfferListActionGroup.hashedReducer(
    (props) => assetOfferListKeySelector(props.stage),
    (state: AssetOfferListState | undefined, action: Action): AssetOfferListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (assetOfferListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (assetOfferListLoadedOkAction.is(action)) {
            return {
                loading: false,
                byId: action.result.map((el) => assetOfferKeySelector(action.stage, el.assetType, el.assetId))
            };
        }

        if (assetOfferListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        return state;
    }
);

export function assetOfferListKeySelector(stage: string) {
    return `${stage}/asset-offer-list`;
}

export interface AssetOfferListResult {
    loading: boolean;
    error?: string;
    data?: AssetOfferWithAssetInfo[];
}

export function assetOfferListSelector(stage: string): (appState: AppState) => AssetOfferListResult {
    return (appState) => {
        const status = appState.assetOffer.assetOfferList[assetOfferListKeySelector(stage)];
        const data = status?.byId?.map((el) => appState.assetOffer.entities[el]);

        return {
            loading: status?.loading ?? false,
            error: status?.error,
            data
        };
    };
}
