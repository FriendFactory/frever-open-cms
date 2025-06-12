import { AppState } from "app-state";
import { AdminRole } from "features/permission-moderation/services";
import { Action } from "redux";

import {
    cmsAdminRoleListActionGroup,
    cmsAdminRoleListLoadedErrorAction,
    cmsAdminRoleListLoadedOkAction,
    cmsAdminRoleListLoadingAction
} from "../actions";

export interface AdminRoleListState {
    loading: boolean;
    error?: string;
    data?: AdminRole[];
}

export const cmsAdminRoleListReducer = cmsAdminRoleListActionGroup.hashedReducer(
    ({ stage }) => roleHashKey(stage),
    (state: AdminRoleListState | undefined, action: Action): AdminRoleListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (cmsAdminRoleListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (cmsAdminRoleListLoadedOkAction.is(action)) {
            return {
                loading: false,
                error: undefined,
                data: action.result
            };
        }

        if (cmsAdminRoleListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        return state;
    }
);

export const permissionRolePageSelector = (stage: string) => (appState: AppState) => {
    const page = appState.permission.roleList[roleHashKey(stage)];

    return {
        loading: page?.loading ?? false,
        data: page?.data,
        error: page?.error
    };
};

const roleHashKey = (stage: string) => `${stage}/roles`;
