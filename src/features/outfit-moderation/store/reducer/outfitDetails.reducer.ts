import { Action } from "redux";

import { AppState } from "app-state";

import { outfitKeySelector } from "./outfit.reducer";
import {
    outfitDetailsActionGroup,
    outfitDetailsLoadingAction,
    outfitDetailsLoadedOkAction,
    outfitDetailsLoadedErrorAction
} from "../actions";
import { assetKeySelector } from "features/search-assets/store";
import { WardrobeAsset } from "features/search-assets/services";
import { Outfit } from "features/outfit-moderation/services";

export interface OutfitDetails {
    loading: boolean;
    error?: string;
    data?: Outfit;
}

export const outfitDetailsReducer = outfitDetailsActionGroup.hashedReducer(
    (props) => outfitKeySelector(props.stage, props.id),
    (state: OutfitDetails | undefined, action: Action): OutfitDetails => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (outfitDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (outfitDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (outfitDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export function outfitDetailsPageSelector(stage: string, id: number): (appState: AppState) => OutfitDetails {
    return (appState) => {
        const detailsPage = appState.outfit.detailsPage[outfitKeySelector(stage, id)];
        const data = appState.outfit.entities?.[outfitKeySelector(stage, id)];

        return {
            loading: detailsPage?.loading ?? false,
            error: detailsPage?.error,
            data
        };
    };
}

export function outfitWardrobesSelector(
    stage: string,
    id: number
): (appState: AppState) => Omit<OutfitDetails, "data"> & { count: number; wardrobes?: WardrobeAsset[] } {
    return (appState) => {
        const { loading, data, error } = outfitDetailsPageSelector(stage, id)(appState);

        const wardrobes = data?.outfitAndWardrobe
            .map((el) => appState.asset.entities[assetKeySelector(stage, "Wardrobe", el.wardrobeId)] as WardrobeAsset)
            .filter(Boolean);

        return {
            loading,
            error,
            wardrobes,
            count: wardrobes?.length ?? 0
        };
    };
}
