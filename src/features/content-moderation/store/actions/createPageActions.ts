import { defineAction } from "rd-redux-utils";

import { CreatePageRow, CreatePageRowDto } from "features/content-moderation/services";

export type CreatePageRowContentActionType = "Add" | "Delete";

export const upsertCreatePageRowsAction =
    defineAction<{ stage: string; items: CreatePageRow[] }>("UPDATE CREATE PAGE ROWS");

export const upsertSingleCreatePageRowAction = defineAction<{ stage: string; data: CreatePageRowDto }>(
    "UPDATE SINGLE CREATE PAGE ROW"
);

export const updateCreatePageRowContentAction = defineAction<{
    stage: string;
    item: CreatePageRow;
    targetContentIds: number[];
    action: CreatePageRowContentActionType;
}>("UPDATE CREATE PAGE ROW CONTENT");

export const upsertCreatePageRowsOkAction =
    defineAction<{ stage: string; data: CreatePageRow[] }>("UPDATE CREATE PAGE ROWS OK");
