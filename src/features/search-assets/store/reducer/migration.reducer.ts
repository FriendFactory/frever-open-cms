import { Action } from "redux";

import { MigrationResponse } from "features/search-assets/services";
import {
    runAssetMigrationAction,
    assetMigrationResponseAction,
    assetMigrationErrorAction,
    closeMigration,
    MigrationParams
} from "../actions";

export type MigrationState = "launched" | "closed";

export interface AssetMigrationsState {
    loading: boolean;
    migrationState: MigrationState;
    params?: MigrationParams;
    assetList?: number[];
    error?: string;
    responses?: MigrationResponse[];
}

export const assetMigrationReducer = (
    state: AssetMigrationsState | undefined,
    action: Action
): AssetMigrationsState => {
    if (!state) {
        state = {
            loading: false,
            migrationState: "closed"
        };
    }

    if (runAssetMigrationAction.is(action)) {
        return {
            loading: true,
            migrationState: "launched",
            params: action.params,
            assetList: action.assetList
        };
    }

    if (assetMigrationErrorAction.is(action)) {
        return {
            loading: false,
            error: action.error,
            params: action.params,
            assetList: action.assetList,
            migrationState: "launched"
        };
    }

    if (assetMigrationResponseAction.is(action)) {
        return {
            loading: false,
            responses: action.responses,
            params: action.params,
            assetList: action.assetList,
            migrationState: "launched"
        };
    }

    if (closeMigration.is(action)) {
        return { loading: false, migrationState: "closed" };
    }
    return state;
};
