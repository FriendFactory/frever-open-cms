import { Action } from "redux";

import { reduceState } from "utils";
import { backgroundAIListLoadedOkAction, upsertBackgroundAIOkAction } from "../../actions/BackgroundAI";
import { BackgroundAI } from "features/vme-backgrounds/services";

export interface BackgroundAIEntitiesState {
    [key: string]: BackgroundAI | undefined;
}

export const backgroundAIEntitiesReducer = (
    state: BackgroundAIEntitiesState | undefined,
    action: Action
): BackgroundAIEntitiesState => {
    if (!state) {
        state = {};
    }

    if (backgroundAIListLoadedOkAction.is(action) || upsertBackgroundAIOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => backgroundAIKeySelector(action.stage, id))
        };
    }

    return state;
};

export const backgroundAIKeySelector = (stage: string, id: number | string) => `${stage}/vme-background-ai/${id}`;
