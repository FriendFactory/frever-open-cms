import { Action } from "redux";

import { LootBox } from "../../services";
import { lootBoxListLoadedOkAction } from "../actions";

export interface LootBoxEntitiesState {
    [x: string]: LootBox | undefined;
}

export const lootBoxEntitiesReducer = (
    state: LootBoxEntitiesState | undefined,
    action: Action
): LootBoxEntitiesState => {
    if (!state) {
        state = {};
    }

    if (lootBoxListLoadedOkAction.is(action)) {
        return action.result.data.reduce<LootBoxEntitiesState>(
            (acc, el) => {
                acc[lootBoxKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    return state;
};

export const lootBoxKeySelector = (stage: string, id: number) => `${stage}/loot-box/${id}`;
