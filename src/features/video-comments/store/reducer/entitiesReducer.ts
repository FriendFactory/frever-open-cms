import { Action } from "redux";

import { VideoComment } from "../../services";
import { commentCommandFinishedAction, videoCommentsLoadedOkAction } from "../actions";

export interface CommentsEntitiesState {
    [key: string]: VideoComment | undefined;
}

export const commentsEntitiesReducer = (
    state: CommentsEntitiesState | undefined,
    action: Action
): CommentsEntitiesState => {
    if (!state) {
        state = {};
    }

    if (videoCommentsLoadedOkAction.is(action)) {
        return { ...state, ...createCommentsWithKey(action.result.data, action.stage) };
    }

    if (commentCommandFinishedAction.is(action)) {
        return {
            ...state,
            ...createCommentsWithKey(action.comments, action.stage)
        };
    }

    return state;
};

function createCommentsWithKey(data: VideoComment[], stage: string): CommentsEntitiesState {
    return data.reduce<CommentsEntitiesState>((accumulator, comment) => {
        accumulator[commentKeySelector(stage, comment.videoId, comment.id)] = comment;
        return accumulator;
    }, {});
}

export const commentKeySelector = (stage: string, videoId: number, id: number): string => `${stage}/${videoId}/${id}`;
