import { StateHash } from "rd-redux-utils";
import { Action } from "redux";

import { AssetOfferType, AssetOfferWithAssetInfo } from "../../../services";
import { AppState } from "app-state";
import { assetOfferKeySelector } from "./assetOfferEntities.reducer";
import {
    assetOfferActionGroup,
    assetOfferLoadingAction,
    assetOfferLoadedOkAction,
    assetOfferLoadedErrorAction,
    assetOffersByAssetIdsLoadedAction,
    assetOffersByAssetIdsLoadingAction
} from "../../actions";

export interface AssetOfferByAssetState {
    loading: boolean;
    error?: string;
    byId?: string | null;
}

export const assetOfferDetailsReducer = assetOfferActionGroup.hashedReducer(
    (props) => assetOfferKeySelector(props.stage, props.assetOfferType, props.assetId),
    (state: AssetOfferByAssetState | undefined, action: Action): AssetOfferByAssetState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (assetOfferLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (assetOfferLoadedOkAction.is(action)) {
            return {
                loading: false,
                byId: action.result ? assetOfferKeySelector(action.stage, action.assetOfferType, action.assetId) : null
            };
        }

        if (assetOfferLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        return state;
    }
);

export const assetOfferByAssetReducer = (
    state: StateHash<AssetOfferByAssetState> | undefined,
    action: Action
): StateHash<AssetOfferByAssetState> => {
    const updatedState = assetOfferDetailsReducer(state, action);

    if (assetOffersByAssetIdsLoadingAction.is(action)) {
        return action.ids.reduce<StateHash<AssetOfferByAssetState>>((acc, assetId) => {
            const key = assetOfferKeySelector(action.stage, action.assetType, assetId);

            acc[key] = {
                loading: true,
                byId: key
            };

            return acc;
        }, updatedState);
    }

    if (assetOffersByAssetIdsLoadedAction.is(action)) {
        return action.result.reduce<StateHash<AssetOfferByAssetState>>((acc, el) => {
            const key = assetOfferKeySelector(action.stage, action.assetType, el.assetId);

            acc[key] = {
                loading: false,
                byId: key
            };

            return acc;
        }, updatedState);
    }

    return updatedState;
};

export interface AssetOfferByAssetResult {
    loading: boolean;
    error?: string;
    data?: AssetOfferWithAssetInfo | null;
}

export function assetOfferByAssetSelector(
    stage: string,
    assetType: AssetOfferType,
    id: number
): (appState: AppState) => AssetOfferByAssetResult {
    return (appState) => {
        const status = appState.assetOffer.assetDetailsPage[assetOfferKeySelector(stage, assetType, id)];
        const data = status?.byId ? appState.assetOffer.entities[status.byId] : null;

        return {
            loading: status?.loading ?? false,
            error: status?.error,
            data
        };
    };
}
