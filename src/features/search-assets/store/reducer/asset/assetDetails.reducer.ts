import { Action } from "redux";

import { AppState } from "app-state";
import { AssetData, AssetDataNames } from "features/search-assets/services";
import {
    assetDetailsActionGroup,
    assetDetailsLoadingAction,
    assetDetailsLoadedOkAction,
    assetDetailsLoadedErrorAction
} from "../../actions";
import { assetKeySelector } from "./asset.reducer";

export interface AssetDetails {
    loading: boolean;
    error?: string;
}

export const assetDetailsReducer = assetDetailsActionGroup.hashedReducer(
    (props) => assetKeySelector(props.stage, props.asset, props.id),
    (state: AssetDetails | undefined, action: Action): AssetDetails => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (assetDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (assetDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (assetDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export interface AssetDetailsResultState<T extends AssetDataNames> {
    loading: boolean;
    error?: string;
    data?: AssetData[T];
}

export function assetDetailsSelector<T extends AssetDataNames>(
    stage: string,
    asset: T,
    id: number
): (appState: AppState) => AssetDetailsResultState<T> {
    return (appState) => {
        const assetData = appState.asset.entities?.[assetKeySelector(stage, asset, id)] as AssetData[T];
        const assetStatus = appState.asset.detailsPage?.[assetKeySelector(stage, asset, id)];

        return {
            loading: assetStatus?.loading ?? false,
            error: assetStatus?.error,
            data: assetData
        };
    };
}
