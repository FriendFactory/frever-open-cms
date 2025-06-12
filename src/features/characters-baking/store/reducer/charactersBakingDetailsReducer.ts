import { Action } from "redux";

import { AppState } from "app-state";
import { charactersBakingKeySelector } from "./charactersBakingEntitiesReducer";
import {
    charactersBakingActionGroup,
    charactersBakingLoadingAction,
    charactersBakingLoadedOkAction,
    charactersBakingLoadedErrorAction
} from "../actions/charactersBakingActions";

interface CharactersBakingDetailsState {
    loading: boolean;
    error?: string;
}

export const charactersBakingDetailsReducer = charactersBakingActionGroup.hashedReducer(
    (props) => charactersBakingKeySelector(props.stage),
    (state: CharactersBakingDetailsState | undefined, action: Action): CharactersBakingDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (charactersBakingLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (charactersBakingLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (charactersBakingLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export const charactersBakingDetailsPageSelector = (stage: string) => (appState: AppState) => {
    const detailsPage = appState.charactersBaking.details[charactersBakingKeySelector(stage)];
    const data = appState.charactersBaking.entities?.[charactersBakingKeySelector(stage)];

    return {
        loading: detailsPage?.loading ?? false,
        error: detailsPage?.error,
        data
    };
};
