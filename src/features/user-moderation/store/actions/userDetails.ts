import { defineActionGroup } from "rd-redux-utils";

import { GetUserInfoParams, User } from "../../services";

export const userDetailsActionGroup = defineActionGroup<GetUserInfoParams>("USER DETAILS");

export const userDetailsLoadingAction = userDetailsActionGroup.defineAction("LOADING");

export const userDetailsLoadedOkAction = userDetailsActionGroup.defineAction<{
    result: User;
}>("LOADED OK");

export const userDetailsLoadedErrorAction = userDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
