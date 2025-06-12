import { AppState } from "app-state";
import { Action } from "redux";

import { FreverofficialGroup } from "features/permission-moderation/services";
import {
    cmsAdminFreverOfficialListActionGroup,
    cmsAdminFreverOfficialListLoadedErrorAction,
    cmsAdminFreverOfficialListLoadedOkAction,
    cmsAdminFreverOfficialListLoadingAction
} from "../actions";

export interface AdminFreverOfficialListState {
    loading: boolean;
    error?: string;
    data?: FreverofficialGroup[];
}

export const cmsAdminFreverOfficialListReducer = cmsAdminFreverOfficialListActionGroup.hashedReducer(
    ({ stage }) => freverOfficialHashKey(stage),
    (state: AdminFreverOfficialListState | undefined, action: Action): AdminFreverOfficialListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (cmsAdminFreverOfficialListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (cmsAdminFreverOfficialListLoadedOkAction.is(action)) {
            return {
                loading: false,
                error: undefined,
                data: action.result
            };
        }

        if (cmsAdminFreverOfficialListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        return state;
    }
);

export const permissionFreverOfficialPageSelector = (stage: string) => (appState: AppState) => {
    const page = appState.permission.freverOfficialList[freverOfficialHashKey(stage)];

    return {
        loading: page?.loading ?? false,
        data: page?.data,
        error: page?.error
    };
};

const freverOfficialHashKey = (stage: string) => `${stage}/frever-official`;
