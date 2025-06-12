import { Action } from "redux";

import { reduceState } from "utils";
import { CreatePageRow } from "features/content-moderation";
import { createPageListLoadedOkAction, upsertCreatePageRowsOkAction } from "features/content-moderation/store/actions";

export interface CreatePageState {
    [key: string]: CreatePageRow | undefined;
}

export const entitiesReducer = (state: CreatePageState | undefined, action: Action): CreatePageState => {
    if (!state) {
        state = {};
    }

    if (createPageListLoadedOkAction.is(action) || upsertCreatePageRowsOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => createPageKeySelector(action.stage, id))
        };
    }

    return state;
};

export const createPageKeySelector = (stage: string, id: number | string) => `${stage}/create-page/${id}`;
