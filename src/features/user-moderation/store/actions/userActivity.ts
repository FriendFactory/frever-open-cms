import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { UserActivity, UserActivityQueryParams } from "../../services";

export const userActivityActionGroup = defineActionGroup<{
    stage: string;
    groupId: number;
    params: UserActivityQueryParams;
}>("USER ACTIVITY");

export const userActivityLoadingAction = userActivityActionGroup.defineAction("LOADING");

export const userActivityLoadedOkAction = userActivityActionGroup.defineAction<{
    result: ResultWithCount<UserActivity>;
}>("LOADED OK");

export const userActivityLoadedErrorAction = userActivityActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
