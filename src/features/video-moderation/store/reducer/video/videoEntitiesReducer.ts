import { Action } from "redux";

import { Video, VideoInfo } from "features/video-moderation/services";
import { videoModerationDetailsLoadedOkAction, videoModerationListLoadedOkAction } from "../../actions";

export interface VideoEntitiesState {
    [x: string]: VideoInfo | undefined;
}

export const videoEntitiesReducer = (state: VideoEntitiesState | undefined, action: Action): VideoEntitiesState => {
    if (!state) {
        state = {};
    }

    if (videoModerationDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [videoInfoKeySelector(action.stage, action.result.video.id)]: action.result
        };
    }

    if (videoModerationListLoadedOkAction.is(action)) {
        const newUserList = action.result.data.reduce((accumulator: VideoEntitiesState, video: Video) => {
            accumulator[videoInfoKeySelector(action.stage, video.id)] = {
                ...state?.[videoInfoKeySelector(action.stage, video.id)],
                video
            };
            return accumulator;
        }, {});
        return { ...state, ...newUserList };
    }

    return state;
};

export const videoInfoKeySelector = (stage: string, id: number) => `${stage}/video-info/${id}`;
