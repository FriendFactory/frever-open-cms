import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { createListPageHashedReducer } from "shared/store";
import {
    scheduledMessageListActionGroup,
    scheduledMessageListLoadingAction,
    scheduledMessageListLoadedOkAction,
    scheduledMessageListLoadedErrorAction
} from "../../actions/scheduledMessageList";
import { scheduledMessageKeySelector } from "./scheduledMessageEntitiesReducer";
import { ScheduledMessageQueryParams } from "features/community-moderation/services/scheduledMessage/getScheduledMessage";
import { SCHEDULED_MESSAGE_LIST_SIZE } from "urls";

export const scheduledMessageListReducer = createListPageHashedReducer({
    group: scheduledMessageListActionGroup,
    loading: scheduledMessageListLoadingAction,
    loadedOk: scheduledMessageListLoadedOkAction,
    loadedError: scheduledMessageListLoadedErrorAction,
    keyFactory: (stage, scheduledMessage) => scheduledMessageKeySelector(stage, scheduledMessage.id)
});

export const scheduledMessageListPageSelector =
    (stage: string, params: ScheduledMessageQueryParams) => (appState: AppState) => {
        const result = appState.scheduledMessage.listPages[hashKeySelector(stage, params)];

        let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.scheduledMessage?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? SCHEDULED_MESSAGE_LIST_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: result?.loading,
            error: result?.error,
            total: result?.total ?? 0,
            data,
            params,
            stage,
            pageSize,
            currentPage
        };
    };

export const scheduledMessageByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = scheduledMessageListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};
