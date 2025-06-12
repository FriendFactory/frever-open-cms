import { defineActionGroup } from "rd-redux-utils";

import { UmaBundle } from "features/search-assets/services";

export const umaBundlesByTIdActionGroup = defineActionGroup<{
    stage: string;
    umaBundleTypeId: number;
}>("UMA BUNDLE LIST BY TYPE ID");

export const umaBundlesByTIdLoadAction =
    umaBundlesByTIdActionGroup.defineAction<{ params: { id?: number; name?: string; skip?: number } }>("LOAD");

export const umaBundlesByTIdLoadingAction = umaBundlesByTIdActionGroup.defineAction("LOADING");

export const umaBundlesByTIdLoadedOkAction = umaBundlesByTIdActionGroup.defineAction<{
    result: UmaBundle[];
}>("LOADED OK");

export const umaBundlesByTIdLoadedErrorAction = umaBundlesByTIdActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
