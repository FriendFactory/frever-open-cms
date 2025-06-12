import { defineActionGroup } from "rd-redux-utils";

import { ExpandDataParams } from "../../services";

export const expandedDataActionGroup = defineActionGroup<ExpandDataParams>("EXPANDED DATA");

export const expandedDataAction = expandedDataActionGroup.defineAction("LOADING");

export const expandedDataLoadedOkAction = expandedDataActionGroup.defineAction<{
    result: any;
}>("LOADED OK");

export const expandedDataLoadedErrorAction = expandedDataActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const expandedDataCleanStatus = expandedDataActionGroup.defineAction("CLEAN NOTIFICATION");
