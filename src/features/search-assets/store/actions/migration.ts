import { MigrationResponse } from "features/search-assets/services";
import { defineAction, defineActionGroup } from "rd-redux-utils";

export type MigrationOperation = "preview" | "migrate";

export type MigrationParams = { operation: MigrationOperation; assetType: string; fromStage: string; toStage: string };

export const assetMigrationActionGroup =
    defineActionGroup<{ params: MigrationParams; assetList: number[] }>("ASSET_MIGRATION");
export const runAssetMigrationAction = assetMigrationActionGroup.defineAction("RUN_MIGRATION");
export const assetMigrationResponseAction = assetMigrationActionGroup.defineAction<{
    responses: MigrationResponse[];
}>("RESPONSE");
export const assetMigrationErrorAction = assetMigrationActionGroup.defineAction<{
    error: string;
}>("RESPONSE ERROR");
export const closeMigration = defineAction("CLOSE MIGRATION");
