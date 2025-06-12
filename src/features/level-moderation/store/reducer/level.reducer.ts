import { Action } from "redux";

import { Level } from "features/level-moderation/services";
import { levelDetailsLoadedOkAction, levelListLoadedOkAction } from "../actions";
import { eventKeySelector } from "./event.reducer";

export interface NormalizedLevel extends Omit<Level, "event"> {
    eventById: string[];
}

export interface LevelEntitiesState {
    [key: string]: NormalizedLevel;
}

export const levelEntitiesReducer = (state: LevelEntitiesState | undefined, action: Action): LevelEntitiesState => {
    if (!state) {
        state = {};
    }

    if (levelListLoadedOkAction.is(action)) {
        return { ...state, ...entitiesWithKey(action.result, action.stage) };
    }

    if (levelDetailsLoadedOkAction.is(action)) {
        return { ...state, [levelKeySelector(action.stage, action.id)]: normalizeLevel(action.result, action.stage) };
    }

    return state;
};

export function normalizeLevel({ event, ...level }: Level, stage: string): NormalizedLevel {
    const eventById = event.map((el) => eventKeySelector(stage, el.id));
    return { ...level, eventById };
}

export function entitiesWithKey(data: Level[], stage: string): LevelEntitiesState {
    return data.reduce((accumulator: { [key: string]: NormalizedLevel }, level) => {
        accumulator[levelKeySelector(stage, level.id)] = normalizeLevel(level, stage);
        return accumulator;
    }, {});
}

export const levelKeySelector = (stage: string, id: number): string => `${stage}/level/${id}`;
