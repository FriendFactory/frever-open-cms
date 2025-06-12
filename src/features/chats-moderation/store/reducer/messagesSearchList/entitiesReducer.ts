import { Action } from "redux";

import { chatMessagesSearchLoadedOkAction } from "../../actions";
import { reduceState } from "utils";
import { ChatMessageSearch } from "features/chats-moderation";

export interface MessageSearchEntitiesState {
    [key: string]: ChatMessageSearch | undefined;
}

export const messagesSearchEntitiesReducer = (
    state: MessageSearchEntitiesState | undefined,
    action: Action
): MessageSearchEntitiesState => {
    if (!state) {
        state = {};
    }

    if (chatMessagesSearchLoadedOkAction.is(action)) {
        return { ...state, ...reduceState(action.data, (id) => messageSearchKeySelector(action.stage, id)) };
    }

    return state;
};

export const messageSearchKeySelector = (stage: string, id: number | string) => `${stage}/messages-search/${id}`;
