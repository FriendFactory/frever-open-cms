import { defineActionGroup } from "rd-redux-utils";

import { MultipleEditingParams } from "../../services";

export const multipleEditingActionGroup = defineActionGroup<MultipleEditingParams>("EDIT");

export const multipleEditingAction = multipleEditingActionGroup.defineAction("PATCH REQUESTS");

export const multipleEditingResponseAction = multipleEditingActionGroup.defineAction<{
    result: boolean[];
}>("RESPONSE");

export const multipleEditingCleanStatus = multipleEditingActionGroup.defineAction("CLEAN NOTIFICATION");
