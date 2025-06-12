import { Action } from "redux";

import { AppState } from "app-state";
import { GetReplicateResponseWithParams } from "features/vme-backgrounds/services";
import {
    runBackgroundAIPreviewAction,
    backgroundAIPreviewResponseAction,
    backgroundAIPreviewErrorAction,
    closeBackgroundAIPreviewAction
} from "../../actions/BackgroundAI/";
import { ReplicateInputType } from "features/vme-backgrounds/helpers";

export interface BackgroundAIPreviewState {
    loading: boolean;
    error?: string;
    replicateInput?: ReplicateInputType[];
    replicateOutput?: GetReplicateResponseWithParams[];
}

export const backgroundAIPreviewReducer = (
    state: BackgroundAIPreviewState | undefined,
    action: Action
): BackgroundAIPreviewState => {
    if (!state) {
        state = {
            loading: false
        };
    }

    if (runBackgroundAIPreviewAction.is(action)) {
        return {
            loading: true,
            replicateInput: action.replicateInput
        };
    }

    if (backgroundAIPreviewErrorAction.is(action)) {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }

    if (backgroundAIPreviewResponseAction.is(action)) {
        return {
            ...state,
            loading: false,
            replicateOutput: action.replicateOutput
        };
    }

    if (closeBackgroundAIPreviewAction.is(action)) {
        return { loading: false };
    }

    return state;
};

export const backgroundAIPreviewSelector = (appState: AppState) => {
    const state = appState.backgroundAI.preview;

    return state;
};
