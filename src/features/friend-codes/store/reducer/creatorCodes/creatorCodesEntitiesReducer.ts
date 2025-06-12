import { Action } from "redux";

import { StarCreatorCode } from "../../../services";
import { creatorCodesListLoadedOkAction, creatorCodeUpsertFinishedAction } from "../../actions/creatorCodes";

export interface CreatorCodesEntitiesState {
    [x: string]: StarCreatorCode | undefined;
}

const initialState = {};

export const creatorCodesEntitiesReducer = (
    state: CreatorCodesEntitiesState | undefined,
    action: Action
): CreatorCodesEntitiesState => {
    if (!state) {
        state = initialState;
    }

    if (creatorCodesListLoadedOkAction.is(action)) {
        return action.result.data.reduce<CreatorCodesEntitiesState>(
            (acc, el) => {
                acc[creatorCodeKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (creatorCodeUpsertFinishedAction.is(action)) {
        return { ...state, [creatorCodeKeySelector(action.stage, action.data.id)]: action.data };
    }

    return state;
};

export const creatorCodeKeySelector = (stage: string, id: number) => `${stage}/creator-code/${id}`;
