import * as qs from "query-string";
import { Action } from "redux";

import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { GetUserListParams, User } from "../../../services";
import { calculateListTotal } from "shared/calculate-list-total";
import { userKeySelector } from "./userEntitiesReducer";
import { DEFAULT_USER_LIST_PAGE_SIZE } from "urls";
import {
    userListActionGroup,
    userListLoadingAction,
    userListLoadedOkAction,
    userListLoadedErrorAction,
    replaceUserInCurrentPageAction,
    userListWithKPILoadingAction
} from "../../actions";

export interface UserListState {
    loading: boolean;
    kpiLoading: boolean;
    error?: string;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const userListReducer = userListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: UserListState | undefined, action: Action): UserListState => {
        if (!state) {
            state = {
                loading: false,
                kpiLoading: false
            };
        }

        if (userListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (userListWithKPILoadingAction.is(action)) {
            return {
                ...state,
                kpiLoading: true,
                error: undefined
            };
        }

        if (userListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (userListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                kpiLoading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.map((el) =>
                        userKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        if (replaceUserInCurrentPageAction.is(action)) {
            const newList = state.pages?.[pageKeySelector(action.params.skip)].filter(
                (userKey) => userKey !== userKeySelector(action.stage, action.oldUser.id)
            );

            if (action.newUser) {
                newList?.push(userKeySelector(action.stage, action.newUser.id));
            }

            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: newList ?? []
                }
            };
        }

        return state;
    }
);

export interface UserListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    kpiLoading: boolean;
    error?: string;
    data?: User[];
    stage: string;
    params: GetUserListParams;
}

export function userListPageSelector(
    stage: string,
    params: GetUserListParams
): (appState: AppState) => UserListPageResult {
    return (appState) => {
        const userListState = appState.user.listPage[hashKeySelector(stage, params)];
        const page = userListState?.pages?.[pageKeySelector(params.skip)];

        const data: User[] | undefined = page?.map((el) => {
            const { mainCharacterById, charactersById, ...user } = appState.user.entities[el];

            return {
                ...user,
                mainCharacter: mainCharacterById ? appState.character.entities[mainCharacterById] : undefined,
                character: charactersById
                    ? charactersById?.map((charaKey) => appState.character.entities[charaKey]).filter(Boolean)
                    : []
            };
        });

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_USER_LIST_PAGE_SIZE) + 1;

        return {
            error: userListState?.error,
            loading: userListState?.loading ?? false,
            kpiLoading: userListState?.kpiLoading,
            data,
            stage,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_USER_LIST_PAGE_SIZE),
            pageSize: DEFAULT_USER_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: GetUserListParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

export const pageKeySelector = (skip?: number) => `skip = ${skip ?? 0}`;
