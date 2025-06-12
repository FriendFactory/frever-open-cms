import { Action } from "redux";

import type { AppState } from "app-state";
import { VideoInfo } from "../../../services/getVideoDetails";
import {
    videoModerationDetailsActionGroup,
    videoModerationDetailsLoadedErrorAction,
    videoModerationDetailsLoadedOkAction,
    videoModerationDetailsLoadingAction
} from "../../actions";
import { videoInfoKeySelector } from "./videoEntitiesReducer";

export const videoModerationDetailsReducer = videoModerationDetailsActionGroup.hashedReducer(
    (a) => videoInfoKeySelector(a.stage, a.videoId),
    (state: VideoModerationDetailsState = { loading: false }, action: Action): VideoModerationDetailsState => {
        if (videoModerationDetailsLoadingAction.is(action)) {
            return {
                ...state,
                error: undefined,
                loading: true
            };
        }

        if (videoModerationDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                error: undefined,
                loading: false,
                byId: videoInfoKeySelector(action.stage, action.result.video.id)
            };
        }

        if (videoModerationDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                error: action.error,
                loading: false
            };
        }

        return state;
    }
);

export interface VideoModerationDetailsState {
    loading: boolean;
    error?: string;
    byId?: string;
    data?: VideoInfo;
}

export const videoDetailsSelector =
    (stage: string, videoId: number) =>
    (appState: AppState): VideoModerationDetailsState => {
        const key = videoInfoKeySelector(stage, videoId);

        const state = appState.videoModeration.detailsPage[key];
        const data = appState.videoModeration.entities[key];

        return !state ? { loading: false } : { ...state, data };
    };
