import { Action } from "redux";

import { StarCreatorCandidate } from "../../services";
import { creatorCandidateListLoadedOkAction, updateCreatorCandidateAction } from "../actions";

export interface CreatorCandidateEntitiesState {
    [key: string]: StarCreatorCandidate | null | undefined;
}

export const creatorCandidateEntitiesReducer = (
    state: CreatorCandidateEntitiesState | undefined,
    action: Action
): CreatorCandidateEntitiesState => {
    if (!state) {
        state = {};
    }

    if (creatorCandidateListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.result, (id: number) => creatorCandidateKeySelector(action.stage, id))
        };
    }

    if (updateCreatorCandidateAction.is(action)) {
        return {
            ...state,
            [creatorCandidateKeySelector(action.stage, action.id)]: action.result
        };
    }

    return state;
};

const reduceState = <T extends { id: number }>(data: T[], keyFactory: (id: number) => string): { [key: string]: T } =>
    data.reduce<{ [key: string]: T }>((accumulator, item) => {
        accumulator[keyFactory(item.id)] = item;
        return accumulator;
    }, {});

export const creatorCandidateKeySelector = (stage: string, id: number) => `${stage}/creator-candidate/${id}`;
