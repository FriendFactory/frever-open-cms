import { MigrationResponse } from "features/search-assets/services";
import { defineAction, defineActionGroup } from "rd-redux-utils";

export type MigrationOperation = "preview" | "migrate";

export type MigrationParams = {
    operation: MigrationOperation;
    entityType: "SetLocationBackgroundSettings";
    fromStage: string;
    toStage: string;
};

export const backgroundAIMigrationActionGroup =
    defineActionGroup<{ params: MigrationParams; backgroundsIds: number[] }>("VME BACKGROUND AI MIGRATION");
export const runBackgroundAIMigrationAction = backgroundAIMigrationActionGroup.defineAction("RUN MIGRATION");
export const backgroundAIMigrationResponseAction = backgroundAIMigrationActionGroup.defineAction<{
    responses: MigrationResponse[];
}>("RESPONSE");
export const backgroundAIMigrationErrorAction = backgroundAIMigrationActionGroup.defineAction<{
    error: string;
}>("RESPONSE ERROR");
export const closeBackgroundAIMigrationAction = defineAction("VME BACKGROUND AI CLOSE MIGRATION");
