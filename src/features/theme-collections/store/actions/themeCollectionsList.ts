import { defineActionGroup } from "rd-redux-utils";

import { ThemeCollection, ThemeCollectionsQueryParams } from "features/theme-collections/services";

export const collectionsListActionGroup =
    defineActionGroup<{ stage: string; params: ThemeCollectionsQueryParams }>("THEME COLLECTIONS LIST");

export const collectionsListLoadAction = collectionsListActionGroup.defineAction("LOAD");

export const collectionsListLoadingAction = collectionsListActionGroup.defineAction("LOADING");

export const collectionsListLoadedOkAction =
    collectionsListActionGroup.defineAction<{ data: ThemeCollection[]; total?: number }>("LOADED OK");

export const collectionsListLoadedErrorAction =
    collectionsListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
