import { defineActionGroup } from "rd-redux-utils";

import { GetUserListParams, User } from "../../services";

export const userListActionGroup = defineActionGroup<{
    params: GetUserListParams;
    stage: string;
}>("USER LIST");

export const userListLoadAction = userListActionGroup.defineAction<{ withKPI?: boolean }>("LOAD");

export const userListLoadingAction = userListActionGroup.defineAction("LOADING");

export const userListWithKPILoadingAction = userListActionGroup.defineAction("KPI LOADING");

export const userListLoadedOkAction = userListActionGroup.defineAction<{
    result: User[];
}>("LOADED OK");

export const userListLoadedErrorAction = userListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const replaceUserInCurrentPageAction = userListActionGroup.defineAction<{
    oldUser: User;
    newUser?: User;
}>("REPLACE USER IN CURRENT PAGE");
