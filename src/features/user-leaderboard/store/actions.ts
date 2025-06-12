import { defineActionGroup } from "rd-redux-utils";

import { UserSocialProfile } from "features/user-leaderboard/services";
import { GetLeaderboardListParams } from "../services";

export const leaderboardListActionGroup =
    defineActionGroup<{ stage: string; params: GetLeaderboardListParams }>("LEADERBOARD LIST");

export const leaderboardListLoadingAction = leaderboardListActionGroup.defineAction("LOADING");

export const leaderboardListLoadedOkAction = leaderboardListActionGroup.defineAction<{
    result: UserSocialProfile[];
}>("LOADED OK");

export const leaderboardListLoadedErrorAction = leaderboardListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
