import { Action } from "redux";
import qs from "query-string";

import { pageKeySelector } from "utils";
import { UserActivity, UserActivityQueryParams } from "../../services";
import { AppState } from "app-state";
import {
    userActivityActionGroup,
    userActivityLoadingAction,
    userActivityLoadedOkAction,
    userActivityLoadedErrorAction
} from "../actions";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE } from "urls";

export interface UserActivityState {
    loading: boolean;
    error?: string;
    total?: number;
    pages: {
        [pageKey: string]: UserActivity[];
    };
}

export const userActivityReducer = userActivityActionGroup.hashedReducer(
    (props) => userActivityHashKeySelector(props.stage, props.groupId, props.params),
    (state: UserActivityState | undefined, action: Action): UserActivityState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (userActivityLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (userActivityLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (userActivityLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data
                }
            };
        }

        return state;
    }
);

export interface UserActivityPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: UserActivity[];
}

export function userActivityPageSelector(
    stage: string,
    groupId: number,
    params: UserActivityQueryParams
): (appState: AppState) => UserActivityPageResult {
    return (appState) => {
        const state = appState.userActivity[userActivityHashKeySelector(stage, groupId, params)];
        const data = state?.pages[pageKeySelector(params.skip)];

        const pageSize = params.take ?? DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            error: state?.error,
            loading: state?.loading ?? false,
            data,
            total: state?.total ?? 0,
            pageSize,
            currentPage
        };
    };
}

export const userActivityHashKeySelector = (
    stage: string,
    groupId: number,
    { skip, take, ...params }: UserActivityQueryParams = {}
): string => {
    return `${stage}/${groupId}/${qs.stringify(params)}`;
};
