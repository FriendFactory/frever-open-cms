import { Action } from "redux";

import { StarCreatorWelcomeMessage } from "../../../services";
import { creatorMessagesListLoadedOkAction, creatorMessageUpsertFinishedAction } from "../../actions/creatorMessages";

export interface CreatorMessagesEntitiesState {
    [x: string]: StarCreatorWelcomeMessage | undefined;
}

const initialState = {};

export const creatorMessagesEntitiesReducer = (
    state: CreatorMessagesEntitiesState | undefined,
    action: Action
): CreatorMessagesEntitiesState => {
    if (!state) {
        state = initialState;
    }

    if (creatorMessagesListLoadedOkAction.is(action)) {
        return action.result.data.reduce<CreatorMessagesEntitiesState>(
            (acc, el) => {
                acc[creatorMessageKeySelector(action.stage, el.groupId)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (creatorMessageUpsertFinishedAction.is(action)) {
        return { ...state, [creatorMessageKeySelector(action.stage, action.data.groupId)]: action.data };
    }

    return state;
};

export const creatorMessageKeySelector = (stage: string, groupId: number) => `${stage}/creator-message/${groupId}`;
