import { Action } from "redux";

import { ChatMessageReport, ReportedMessageListParams } from "features/reported-messages/services";
import {
    reportMessageListActionGroup,
    reportMessageListLoadedErrorAction,
    reportMessageListLoadedOkAction,
    reportMessageListLoadingAction
} from "../actions";
import { AppState } from "app-state";
import { DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { hashKeySelector, pageKeySelector } from "utils";
import { reportedMessageKeySelector } from "./reportedMessageEntitiesReducer";

export interface ReportMessageListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const reportedMessageListReducer = reportMessageListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: ReportMessageListState | undefined, action: Action): ReportMessageListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (reportMessageListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (reportMessageListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (reportMessageListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        reportedMessageKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface ReportedMessageLisPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: ChatMessageReport[];
    total: number;
}

export function reportedMessageListSelector(
    stage: string,
    params: ReportedMessageListParams
): (appState: AppState) => ReportedMessageLisPageResult {
    return (appState) => {
        const state = appState.reportedMessages.list[hashKeySelector(stage, params)];

        const data = state?.pages?.[pageKeySelector(params.skip)]
            ?.map((el) => appState.reportedMessages.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;
        return {
            loading: state?.loading ?? false,
            error: state?.error,
            total: state?.total ?? 0,
            data,
            currentPage,
            pageSize
        };
    };
}
