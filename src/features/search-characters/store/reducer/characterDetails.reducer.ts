import { Action } from "redux";

import { AppState } from "app-state";
import { Character } from "features/user-moderation/services";
import {
    characterDetailsActionGroup,
    characterDetailsLoadingAction,
    characterDetailsLoadedOkAction,
    characterDetailsLoadedErrorAction
} from "../actions";
import { characterKeySelector } from "./character.reducer";
import { AssetListPageResult, assetListPageSelector } from "features/search-assets/store";
import { AssetListParams } from "features/search-assets/services";

export interface CharacterDetailsState {
    loading: boolean;
    error?: string;
    data?: Character;
}

export const characterDetailsReducer = characterDetailsActionGroup.hashedReducer(
    (props) => characterKeySelector(props.stage, props.id),
    (state: CharacterDetailsState | undefined, action: Action): CharacterDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (characterDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (characterDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (characterDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export const characterDetailsSelector =
    (stage: string, id: number) =>
    (appState: AppState): CharacterDetailsState => {
        const pageStatus = appState.character.detailsPages[characterKeySelector(stage, id)];
        const data = appState.character.entities?.[characterKeySelector(stage, id)];

        return {
            loading: pageStatus?.loading ?? false,
            error: pageStatus?.error,
            data
        };
    };

export const characterWardrobesSelector =
    (stage: string, params: AssetListParams) =>
    (appState: AppState): AssetListPageResult<"Wardrobe"> | undefined => {
        if (!params.umaRecipeId) {
            return;
        }

        return assetListPageSelector(stage, params, "Wardrobe")(appState);
    };
