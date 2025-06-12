import { defineActionGroup } from "rd-redux-utils";

import { CreatePageRow, CreatePageRowQueryParams } from "features/content-moderation/services";

export const createPageListActionGroup =
    defineActionGroup<{ stage: string; params: CreatePageRowQueryParams }>("CREATE PAGE LIST");

export const createPageListLoadAction = createPageListActionGroup.defineAction("LOAD");

export const createPageListLoadingAction = createPageListActionGroup.defineAction("LOADING");

export const createPageListLoadedOkAction =
    createPageListActionGroup.defineAction<{ data: CreatePageRow[]; total?: number }>("LOADED OK");

export const createPageListLoadedErrorAction =
    createPageListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
