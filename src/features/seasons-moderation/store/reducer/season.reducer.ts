import { Action } from "redux";

import { seasonDetailsLoadedOkAction, seasonListLoadedOkAction } from "../actions";
import { Season, SeasonBaseInfo, SeasonInfo } from "features/seasons-moderation/services";

export interface SeasonEntitiesState {
    [key: string]: Season;
}

export const seasonEntitiesReducer = (state: SeasonEntitiesState | undefined, action: Action): SeasonEntitiesState => {
    if (!state) {
        state = {};
    }

    if (seasonListLoadedOkAction.is(action)) {
        return { ...state, ...createSeasonWithKey(action.result.data, action.stage, state) };
    }

    if (seasonDetailsLoadedOkAction.is(action)) {
        const keySelector = seasonKeySelector(action.stage, action.id);
        return { ...state, [keySelector]: { ...state[keySelector], ...action.result } };
    }

    return state;
};

function createSeasonWithKey(
    data: Array<SeasonBaseInfo | SeasonInfo>,
    stage: string,
    currentState: SeasonEntitiesState
): SeasonEntitiesState {
    return data.reduce((accumulator: { [key: string]: SeasonBaseInfo | SeasonInfo }, el) => {
        accumulator[seasonKeySelector(stage, el.id)] = {
            ...currentState[seasonKeySelector(stage, el.id)],
            ...el
        };
        return accumulator;
    }, {});
}

export const seasonKeySelector = (stage: string, id: number): string => `${stage}/${id}`;
