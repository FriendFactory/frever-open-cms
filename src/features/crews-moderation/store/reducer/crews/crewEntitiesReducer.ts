import { Action } from "redux";

import { Crew } from "../../../services";
import { crewsListLoadedOkAction, updateCrewOkAction } from "../../actions";

export interface CrewEntitiesState {
    [key: string]: Crew | undefined;
}

export const crewEntitiesReducer = (state: CrewEntitiesState | undefined, action: Action): CrewEntitiesState => {
    if (!state) {
        state = {};
    }

    if (crewsListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.result.data, (id: number) => crewKeySelector(action.stage, id))
        };
    }

    if (updateCrewOkAction.is(action)) {
        return {
            ...state,
            [crewKeySelector(action.stage, action.result.id)]: action.result
        };
    }

    return state;
};

const reduceState = <T extends { id: number }>(data: T[], keyFactory: (id: number) => string): { [key: string]: T } =>
    data.reduce<{ [key: string]: T }>((accumulator, item) => {
        accumulator[keyFactory(item.id)] = item;
        return accumulator;
    }, {});

export const crewKeySelector = (stage: string, id: number) => `${stage}/crew/${id}`;

export const getCrewKeyStageId = (key: string) => key.split("/")[0]