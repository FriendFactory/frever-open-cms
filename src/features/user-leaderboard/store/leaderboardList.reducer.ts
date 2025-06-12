import { Action } from "redux";
import qs from "query-string";

import { PagingInfoSelectResult } from "shared";
import { DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE } from "urls";
import { AppState } from "app-state";
import { GetLeaderboardListParams, UserSocialProfile } from "features/user-leaderboard/services";
import {
    leaderboardListActionGroup,
    leaderboardListLoadingAction,
    leaderboardListLoadedOkAction,
    leaderboardListLoadedErrorAction
} from "./actions";
import { calculateListTotal } from "shared/calculate-list-total";

export interface LeaderboardListState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: UserSocialProfile[];
    };
}

const initialState = {
    loading: false,
    pages: {}
};

export const leaderboardListReducer = leaderboardListActionGroup.hashedReducer(
    (props) => leadHashKeySelector(props.stage, props.params),
    (state: LeaderboardListState | undefined, action: Action): LeaderboardListState => {
        if (!state) {
            state = initialState;
        }

        if (leaderboardListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (leaderboardListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (leaderboardListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,

                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result
                }
            };
        }

        return state;
    }
);

export interface LeaderboardListPageResult extends PagingInfoSelectResult {
    error?: string;
    loading: boolean;
    data?: UserSocialProfile[];
    stage: string;
    mainGroupId?: string;
    params: GetLeaderboardListParams;
}

export function leaderboardListPageSelector(
    stage: string,
    params: GetLeaderboardListParams
): (appState: AppState) => LeaderboardListPageResult {
    return (appState) => {
        const leaderboardState = appState.leaderboardList[leadHashKeySelector(stage, params || {})];
        const page = leaderboardState?.pages[pageKeySelector(params.skip)];

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE) + 1;

        return {
            error: leaderboardState?.error,
            loading: leaderboardState?.loading ?? false,
            data: page,
            stage,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE),
            pageSize: DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

export function leadHashKeySelector(stage: string, params: GetLeaderboardListParams) {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}
