import { Action } from "redux";

import { Level, LevelEvent } from "features/level-moderation/services";
import { eventDetailsLoadedOkAction, levelDetailsLoadedOkAction, levelListLoadedOkAction } from "../actions";

export interface EventEntitiesState {
    [key: string]: LevelEvent;
}

export const eventEntitiesReducer = (state: EventEntitiesState | undefined, action: Action): EventEntitiesState => {
    if (!state) {
        state = {};
    }

    if (levelListLoadedOkAction.is(action)) {
        const newEvents = action.result.reduce(
            (acc: EventEntitiesState, level: Level) => ({ ...acc, ...eventsWithKey(level.event, action.stage) }),
            {}
        );

        return { ...state, ...newEvents };
    }

    if (levelDetailsLoadedOkAction.is(action)) {
        return { ...state, ...eventsWithKey(action.result.event, action.stage, state) };
    }

    if (eventDetailsLoadedOkAction.is(action)) {
        return { ...state, [eventKeySelector(action.stage, action.id)]: action.result };
    }

    return state;
};

export const eventsWithKey = (events: LevelEvent[], stage: string, state?: EventEntitiesState): EventEntitiesState =>
    events.reduce((accumulator: { [key: string]: LevelEvent }, event) => {
        accumulator[eventKeySelector(stage, event.id)] = { ...state?.[eventKeySelector(stage, event.id)], ...event };
        return accumulator;
    }, {});

export const eventKeySelector = (stage: string, id: number): string => `${stage}/event/${id}`;
