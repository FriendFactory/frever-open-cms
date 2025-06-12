import { AppState } from "app-state";
import { AdminAccessScope } from "features/permission-moderation/services";
import { Action } from "redux";

import {
    cmsAdminAccessScopeListActionGroup,
    cmsAdminAccessScopeListLoadedErrorAction,
    cmsAdminAccessScopeListLoadedOkAction,
    cmsAdminAccessScopeListLoadingAction
} from "../actions";

export interface AdminAccessScopeListState {
    loading: boolean;
    error?: string;
    data?: AdminAccessScope[];
}

export const cmsAdminAccessScopeListReducer = cmsAdminAccessScopeListActionGroup.hashedReducer(
    ({ stage }) => accessScopeHashKey(stage),
    (state: AdminAccessScopeListState | undefined, action: Action): AdminAccessScopeListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (cmsAdminAccessScopeListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (cmsAdminAccessScopeListLoadedOkAction.is(action)) {
            return {
                loading: false,
                error: undefined,
                data: action.result
            };
        }

        if (cmsAdminAccessScopeListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        return state;
    }
);

export const permissionAccessScopePageSelector = (stage: string) => (appState: AppState) => {
    const page = appState.permission.accessScopeList[accessScopeHashKey(stage)];

    return {
        loading: page?.loading ?? false,
        data: page?.data,
        error: page?.error
    };
};

const accessScopeHashKey = (stage: string) => `${stage}/access-scope`;
