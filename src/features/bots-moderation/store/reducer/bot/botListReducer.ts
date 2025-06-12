import { Action } from "redux";
import qs from "query-string";

import { NormalizedBot, botKeySelector } from "./botEntitiesReducer";
import {
    botListActionGroup,
    botListLoadingAction,
    botListLoadedOkAction,
    botListLoadedErrorAction
} from "../../actions";
import { Bot, BotListQueryParams } from "features/bots-moderation/services";
import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_BOT_LIST_PAGE_SIZE } from "urls";

export interface BotListState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: { [pageKey: string]: string[] };
}

export const botListReducer = botListActionGroup.hashedReducer(
    ({ stage, params }) => botStatusKeySelector(stage, params),
    (state: BotListState | undefined, action: Action): BotListState => {
        if (!state) {
            state = { loading: false };
        }

        if (botListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (botListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (botListLoadedOkAction.is(action)) {
            const ids = action.result.data.map((item) => botKeySelector(action.stage, item.id));

            return {
                ...state,
                loading: false,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: ids
                }
            };
        }

        return state;
    }
);

export interface BotListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: Bot[] | NormalizedBot[];
}

export function botListPageSelector(
    stage: string,
    params: BotListQueryParams
): (appState: AppState) => BotListPageResult {
    return (appState) => {
        const listPages = appState.bots.listPages[botStatusKeySelector(stage, params)];

        const data = listPages?.pages?.[pageKeySelector(params.skip)]
            ?.map((item) => appState.bots.entities[item]!)
            ?.filter(Boolean);

        const pageSize = params.take ?? DEFAULT_BOT_LIST_PAGE_SIZE;
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

export const pageKeySelector = (skip: number | undefined): string => `skip = ${skip ?? 0}`;

export const botStatusKeySelector = (stage: string, { skip, ...params }: BotListQueryParams): string =>
    `${stage}/params:${qs.stringify((params as any) ?? {})}`;
