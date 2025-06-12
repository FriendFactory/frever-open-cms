import { Action } from "redux";

import { CharacterBakedViewStatistics } from "features/characters-baking/services/api";
import { charactersBakingLoadedOkAction } from "../actions/charactersBakingActions";

export interface CharactersBakingState {
    [key: string]: CharacterBakedViewStatistics | undefined;
}

export const charactersBakingEntitiesReducer = (
    state: CharactersBakingState | undefined,
    action: Action
): CharactersBakingState => {
    if (!state) {
        state = {};
    }

    if (charactersBakingLoadedOkAction.is(action)) {
        return {
            ...state,
            [charactersBakingKeySelector(action.stage)]: action.data
        };
    }

    return state;
};

export const charactersBakingKeySelector = (stage: string) => `${stage}/characters-baking`;
