import { Action } from "redux";

import { reduceState } from "utils";
import { VMEBackground } from "../../services";
import { upsertVMEBackgroundOkAction } from "../actions";
import { vmeBackgroundListLoadedOkAction } from "../actions/vmeBackgroundList";

export interface VMEBackgroundEntitiesState {
    [key: string]: VMEBackground | undefined;
}

export const vmeBackgroundEntitiesReducer = (
    state: VMEBackgroundEntitiesState | undefined,
    action: Action
): VMEBackgroundEntitiesState => {
    if (!state) {
        state = {};
    }

    if (vmeBackgroundListLoadedOkAction.is(action) || upsertVMEBackgroundOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => vmeBackgroundKeySelector(action.stage, id))
        };
    }

    return state;
};

export const vmeBackgroundKeySelector = (stage: string, id: number | string) => `${stage}/vme-background/${id}`;
