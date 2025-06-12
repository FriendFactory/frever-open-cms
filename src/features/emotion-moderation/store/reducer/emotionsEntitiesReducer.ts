import { Action } from "redux";

import { reduceState } from "utils";
import { emotionsListLoadedOkAction, upsertEmotionsOkAction } from "../actions";
import { Emotion } from "features/emotion-moderation/services";

export interface ThemeCollectionState {
    [key: string]: Emotion | undefined;
}

export const emotionsEntitiesReducer = (
    state: ThemeCollectionState | undefined,
    action: Action
): ThemeCollectionState => {
    if (!state) {
        state = {};
    }

    if (emotionsListLoadedOkAction.is(action) || upsertEmotionsOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => emotionsKeySelector(action.stage, id))
        };
    }

    return state;
};

export const emotionsKeySelector = (stage: string, id: number | string) => `${stage}/emotions/${id}`;
