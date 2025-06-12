import { Action } from "redux";

import { CloserVideosIds } from "../../services/getCloserVideosIds";
import { closerVideosIdsAction, closerVideosIdsLoadedOkAction, closerVideosIdsLoadedErrorAction } from "../actions";

export interface CloserVideosIdsState {
    loading: boolean;
    error?: string;
    result?: CloserVideosIds;
}

export const closerVideosIdsReducer = (
    state: CloserVideosIdsState | undefined,
    action: Action
): CloserVideosIdsState => {
    if (!state) {
        state = {
            loading: false
        };
    }
    if (closerVideosIdsAction.is(action)) {
        return {
            ...state,
            error: undefined,
            loading: true
        };
    }

    if (closerVideosIdsLoadedOkAction.is(action)) {
        return {
            ...state,
            error: undefined,
            loading: false,
            result: action.result
        };
    }

    if (closerVideosIdsLoadedErrorAction.is(action)) {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }

    return state;
};
