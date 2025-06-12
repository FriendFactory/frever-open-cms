import { AppState } from "app-state";
import { Action } from "redux";

import { AdminUser, AdminUsersQueryParams } from "features/permission-moderation/services";
import {
    cmsAdminUserListActionGroup,
    cmsAdminUserListLoadedErrorAction,
    cmsAdminUserListLoadedOkAction,
    cmsAdminUserListLoadingAction
} from "../actions";
import { calculateListTotal } from "shared/calculate-list-total";
import { CMS_ADMIN_USERS_PAGE_SIZE } from "urls";

export interface AdminUserListState {
    loading: boolean;
    error?: string;
    data?: AdminUser[];
}

export const cmsAdminUserListReducer = cmsAdminUserListActionGroup.hashedReducer(
    ({ stage }) => userHashKey(stage),
    (state: AdminUserListState | undefined, action: Action): AdminUserListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (cmsAdminUserListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (cmsAdminUserListLoadedOkAction.is(action)) {
            return {
                loading: false,
                error: undefined,
                data: action.result
            };
        }

        if (cmsAdminUserListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        return state;
    }
);

export const permissionUserPageSelector =
    (stage: string, params: AdminUsersQueryParams = {}) =>
    (appState: AppState) => {
        const list = appState.permission.userList[userHashKey(stage)];

        const pageSize = params.take ?? CMS_ADMIN_USERS_PAGE_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        const total = calculateListTotal(list?.data?.length ?? 0, params.skip, CMS_ADMIN_USERS_PAGE_SIZE);

        return {
            loading: list?.loading ?? false,
            data: list?.data,
            error: list?.error,
            pageSize,
            currentPage,
            total
        };
    };

const userHashKey = (stage: string) => `${stage}/roles`;
