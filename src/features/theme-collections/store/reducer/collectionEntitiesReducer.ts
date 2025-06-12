import { Action } from "redux";

import { reduceState } from "utils";
import { collectionsListLoadedOkAction, upsertCollectionsOkAction } from "../actions";
import { ThemeCollection } from "features/theme-collections/services";

export interface ThemeCollectionState {
    [key: string]: ThemeCollection | undefined;
}

export const collectionEntitiesReducer = (
    state: ThemeCollectionState | undefined,
    action: Action
): ThemeCollectionState => {
    if (!state) {
        state = {};
    }

    if (collectionsListLoadedOkAction.is(action) || upsertCollectionsOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => themeCollectionKeySelector(action.stage, id))
        };
    }

    return state;
};

export const themeCollectionKeySelector = (stage: string, id: number | string) => `${stage}/theme-collection/${id}`;
