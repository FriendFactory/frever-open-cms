import { defineAction } from "rd-redux-utils";

import { IntellectualProperty } from "features/intellectual-property";

export const upsertIntellectualPropertyAction =
    defineAction<{ stage: string; items: IntellectualProperty[] }>("UPDATE INTELLECTUAL PROPERTY");

export const upsertSingleIntellectualPropertyAction = defineAction<{
    stage: string;
    data: Partial<IntellectualProperty>;
}>("UPDATE SINGLE INTELLECTUAL PROPERTY");

export const upsertIntellectualPropertyOkAction = defineAction<{ stage: string; data: IntellectualProperty[] }>(
    "UPDATE INTELLECTUAL PROPERTY OK"
);
