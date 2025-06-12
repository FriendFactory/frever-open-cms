import { Action } from "redux";

import { reduceState } from "utils";
import { ScheduledMessage } from "features/community-moderation/services/api";
import { scheduledMessageListLoadedOkAction, upsertScheduledMessageOkAction } from "../../actions/scheduledMessageList";

export interface ScheduledMessageState {
    [key: string]: ScheduledMessage | undefined;
}

export const scheduledMessageEntitiesReducer = (
    state: ScheduledMessageState | undefined,
    action: Action
): ScheduledMessageState => {
    if (!state) {
        state = {};
    }

    if (scheduledMessageListLoadedOkAction.is(action) || upsertScheduledMessageOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => scheduledMessageKeySelector(action.stage, id))
        };
    }

    return state;
};

export const scheduledMessageKeySelector = (stage: string, id: number | string) => `${stage}/scheduled-message/${id}`;
