import { Action } from "redux";

import { reduceState } from "utils";
import { LeaderboardVideo } from "features/video-leaderboard/services";
import { videoLeadListLoadedOkAction } from "../actions/actions";

interface VideoLeaderboardState {
    [key: string]: LeaderboardVideo | undefined;
}

export const entitiesReducer = (state: VideoLeaderboardState | undefined, action: Action): VideoLeaderboardState => {
    if (!state) {
        state = {};
    }

    if (videoLeadListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => videoLeaderboardKeySelector(action.stage, id))
        };
    }

    return state;
};

export const videoLeaderboardKeySelector = (stage: string, id: number | string) => `${stage}/leaderboard/${id}`;
