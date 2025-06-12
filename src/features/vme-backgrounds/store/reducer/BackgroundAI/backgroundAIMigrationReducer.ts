import { Action } from "redux";

import { MigrationResponse } from "features/search-assets/services";
import {
    runBackgroundAIMigrationAction,
    backgroundAIMigrationResponseAction,
    backgroundAIMigrationErrorAction,
    closeBackgroundAIMigrationAction,
    MigrationParams
} from "../../actions/BackgroundAI";

export type MigrationState = "launched" | "closed";

export interface BackgroundAIMigrationsState {
    loading: boolean;
    migrationState: MigrationState;
    params?: MigrationParams;
    backgroundsIds?: number[];
    error?: string;
    responses?: MigrationResponse[];
}

export const backgroundAIMigrationReducer = (
    state: BackgroundAIMigrationsState | undefined,
    action: Action
): BackgroundAIMigrationsState => {
    if (!state) {
        state = {
            loading: false,
            migrationState: "closed"
        };
    }

    if (runBackgroundAIMigrationAction.is(action)) {
        return {
            loading: true,
            migrationState: "launched",
            params: action.params,
            backgroundsIds: action.backgroundsIds
        };
    }

    if (backgroundAIMigrationErrorAction.is(action)) {
        return {
            loading: false,
            error: action.error,
            params: action.params,
            backgroundsIds: action.backgroundsIds,
            migrationState: "launched"
        };
    }

    if (backgroundAIMigrationResponseAction.is(action)) {
        return {
            loading: false,
            responses: action.responses,
            params: action.params,
            backgroundsIds: action.backgroundsIds,
            migrationState: "launched"
        };
    }

    if (closeBackgroundAIMigrationAction.is(action)) {
        return { loading: false, migrationState: "closed" };
    }

    return state;
};
