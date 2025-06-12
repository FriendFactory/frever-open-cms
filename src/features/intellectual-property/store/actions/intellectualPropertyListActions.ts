import { defineActionGroup } from "rd-redux-utils";

import { IntellectualProperty, IntellectualPropertyQueryParams } from "features/intellectual-property";

export const intellectualPropertyListActionGroup =
    defineActionGroup<{ stage: string; params: IntellectualPropertyQueryParams }>("INTELLECTUAL PROPERTY LIST");

export const intellectualPropertyListLoadAction = intellectualPropertyListActionGroup.defineAction("LOAD");

export const intellectualPropertyListLoadingAction = intellectualPropertyListActionGroup.defineAction("LOADING");

export const intellectualPropertyListLoadedOkAction =
    intellectualPropertyListActionGroup.defineAction<{ data: IntellectualProperty[]; total?: number }>("LOADED OK");

export const intellectualPropertyListLoadedErrorAction =
    intellectualPropertyListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
