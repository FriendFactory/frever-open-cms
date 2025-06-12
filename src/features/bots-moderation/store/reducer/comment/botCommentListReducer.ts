import { Action } from "redux";
import qs from "query-string";

import {
    botCommentListActionGroup,
    botCommentListLoadingAction,
    botCommentListLoadedOkAction,
    botCommentListLoadedErrorAction
} from "../../actions";
import { botCommentKeySelector } from "./botCommentEntitiesReducer";
import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE } from "urls";
import { BotComment, BotCommentListQueryParams } from "features/bots-moderation/services";

export interface BotCommentListState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: { [pageKey: string]: string[] };
}

export const botCommentListReducer = botCommentListActionGroup.hashedReducer(
    (props) => botCommentListPageKeySelector(props.stage, props.params),
    (state: BotCommentListState | undefined, action: Action): BotCommentListState => {
        if (!state) {
            state = { loading: false };
        }

        if (botCommentListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (botCommentListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (botCommentListLoadedOkAction.is(action)) {
            const keys = action.result.data.map((item) => botCommentKeySelector(action.stage, item.id));

            return {
                ...state,
                loading: false,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: keys
                }
            };
        }

        return state;
    }
);

export interface BotCommentListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: BotComment[];
}

export function botCommentListPageSelector(
    stage: string,
    params: BotCommentListQueryParams
): (appState: AppState) => BotCommentListPageResult {
    return (appState) => {
        const listPages = appState.botComments.listPages[botCommentListPageKeySelector(stage, params)];

        const data = listPages?.pages?.[pageKeySelector(params.skip)]
            ?.map((item) => appState.botComments.entities[item]!)
            ?.filter(Boolean);

        const pageSize = params.take ?? DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: listPages?.loading ?? false,
            data,
            params,
            total: listPages?.total ?? 0,
            stage,
            error: listPages?.error,
            pageSize,
            currentPage
        };
    };
}

const pageKeySelector = (skip: number | undefined): string => `skip = ${skip ?? 0}`;

export const botCommentListPageKeySelector = (stage: string, { skip, ...params }: BotCommentListQueryParams): string =>
    `${stage}/params:${qs.stringify(params || {})}`;
