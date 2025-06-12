import { defineActionGroup } from "rd-redux-utils";

import { VideoLeaderboardQueryParams, LeaderboardVideo } from "features/video-leaderboard/services";

export const videoLeadListActionGroup = defineActionGroup<{
    stage: string;
    params: VideoLeaderboardQueryParams;
}>("VIDEO LEADERBOARD LIST");

export const videoLeadListLoadingAction = videoLeadListActionGroup.defineAction("LOADING");

export const videoLeadListLoadedOkAction =
    videoLeadListActionGroup.defineAction<{ data: LeaderboardVideo[]; total?: number }>("LOADED OK");

export const videoLeadListLoadedErrorAction = videoLeadListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
