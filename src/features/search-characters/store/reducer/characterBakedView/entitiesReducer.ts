import { Action } from "redux";

import { reduceState } from "utils";
import { CharacterBakedView } from "features/search-characters/services";
import { characterBakedViewLoadedOkAction } from "../../actions";

export interface CharacterBakedViewState {
    [key: string]: CharacterBakedView | undefined;
}

export const entitiesReducer = (
    state: CharacterBakedViewState | undefined,
    action: Action
): CharacterBakedViewState => {
    if (!state) {
        state = {};
    }

    if (characterBakedViewLoadedOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => characterBakedViewSelector(action.stage, id))
        };
    }

    return state;
};

export const characterBakedViewSelector = (stage: string, id: number | string) => `${stage}/character-baked-view/${id}`;
