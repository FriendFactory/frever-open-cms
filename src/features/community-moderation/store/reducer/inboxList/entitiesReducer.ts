import { Action } from "redux";

import { InboxInfo } from "features/community-moderation/services/api";
import { reduceState } from "utils";
import { inboxListLoadedOkAction } from "../../actions/inboxList";

export interface InboxEntitiesState {
    [key: string]: InboxInfo | undefined;
}

export const inboxEntitiesReducer = (state: InboxEntitiesState | undefined, action: Action): InboxEntitiesState => {
    if (!state) {
        state = {};
    }

    if (inboxListLoadedOkAction.is(action)) {
        return { ...state, ...reduceState(action.data, (id) => inboxInfoKeySelector(action.stage, id)) };
    }

    return state;
};

export const inboxInfoKeySelector = (stage: string, id: number | string) => `${stage}/inbox-info/${id}`;
