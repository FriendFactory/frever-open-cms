import { Action } from "redux";

import { ChatInfo } from "../../../services";
import { chatsListLoadedOkAction } from "../../actions";
import { reduceState } from "utils";

export interface ChatsEntitiesState {
    [key: string]: ChatInfo | undefined;
}

export const chatsEntitiesReducer = (state: ChatsEntitiesState | undefined, action: Action): ChatsEntitiesState => {
    if (!state) {
        state = {};
    }

    if (chatsListLoadedOkAction.is(action)) {
        return { ...state, ...reduceState(action.data, (id) => chatInfoKeySelector(action.stage, id)) };
    }

    return state;
};

export const chatInfoKeySelector = (stage: string, id: number | string) => `${stage}/chat-info/${id}`;
