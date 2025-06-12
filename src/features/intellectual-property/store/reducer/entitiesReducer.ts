import { Action } from "redux";

import { reduceState } from "utils";
import { intellectualPropertyListLoadedOkAction, upsertIntellectualPropertyOkAction } from "../actions";
import { IntellectualProperty } from "features/intellectual-property";

export interface IntellectualPropertyState {
    [key: string]: IntellectualProperty | undefined;
}

export const entitiesReducer = (
    state: IntellectualPropertyState | undefined,
    action: Action
): IntellectualPropertyState => {
    if (!state) {
        state = {};
    }

    if (intellectualPropertyListLoadedOkAction.is(action) || upsertIntellectualPropertyOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => intellectualPropertyKeySelector(action.stage, id))
        };
    }

    return state;
};

export const intellectualPropertyKeySelector = (stage: string, id: number | string) =>
    `${stage}/intellectual-property/${id}`;
