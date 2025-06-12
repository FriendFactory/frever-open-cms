import { defineActionGroup } from "rd-redux-utils";

import { UmaBudnleListQueryParams, UmaBundle } from "../../services";

export const umaBundleListActionGroup = defineActionGroup<{
    stage: string;
    params: UmaBudnleListQueryParams;
}>("UMA BUNDLE LIST");

export const umaBundleListLoadingAction = umaBundleListActionGroup.defineAction("LOADING");

export const umaBundleListLoadedOkAction = umaBundleListActionGroup.defineAction<{
    result: UmaBundle[];
}>("LOADED OK");

export const umaBundleListLoadedErrorAction = umaBundleListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
