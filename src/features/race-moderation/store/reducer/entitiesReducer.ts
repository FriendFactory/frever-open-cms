import { Action } from "redux";

import { reduceState } from "utils";
import { Race } from "features/race-moderation/services";
import { raceListLoadedOkAction, upsertRacesOkAction } from "../actions";

export interface RaceState {
    [key: string]: Race | undefined;
}

export const entitiesReducer = (state: RaceState | undefined, action: Action): RaceState => {
    if (!state) {
        state = {};
    }

    if (raceListLoadedOkAction.is(action) || upsertRacesOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => raceKeySelector(action.stage, id))
        };
    }

    return state;
};

export const raceKeySelector = (stage: string, id: number | string) => `${stage}/race/${id}`;
