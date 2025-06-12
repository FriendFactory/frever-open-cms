import { Action } from "redux";

import { ChatMessageReport } from "features/reported-messages/services";
import { reportMessageListLoadedOkAction, updateMessageListAction } from "../actions";

export interface ReportMessageEntitiesState {
    [x: string]: ChatMessageReport | undefined;
}

export const reportedMessageEntitiesReducer = (
    state: ReportMessageEntitiesState | undefined,
    action: Action
): ReportMessageEntitiesState => {
    if (!state) {
        state = {};
    }

    if (reportMessageListLoadedOkAction.is(action)) {
        return action.result.data.reduce<ReportMessageEntitiesState>(
            (acc, el) => {
                acc[reportedMessageKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (updateMessageListAction.is(action)) {
        const key = reportedMessageKeySelector(action.stage, action.result.id);

        const updatedEntity = { ...state[key], ...action.result };

        return {
            ...state,
            [key]: updatedEntity
        };
    }

    return state;
};

export const reportedMessageKeySelector = (stage: string, id: number) => `${stage}/reported-message/${id}`;
