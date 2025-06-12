import { Action } from "redux";

import { reduceState } from "utils";
import { universeListLoadedOkAction, upsertUniversesOkAction } from "../actions";
import { Universe } from "features/universe-moderation/services/api";

export interface UniverseState {
    [key: string]: Universe | undefined;
}

export const entitiesReducer = (state: UniverseState | undefined, action: Action): UniverseState => {
    if (!state) {
        state = {};
    }

    if (universeListLoadedOkAction.is(action) || upsertUniversesOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => universeKeySelector(action.stage, id))
        };
    }

    return state;
};

export const universeKeySelector = (stage: string, id: number | string) => `${stage}/universe/${id}`;
