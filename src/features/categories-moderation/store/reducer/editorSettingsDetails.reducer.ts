import { Action } from "redux";

import { AppState } from "app-state";
import { EditorSettings } from "features/categories-moderation/services/api";
import {
    editorSettingsActionGroup,
    editorSettingsLoadingAction,
    editorSettingsLoadedOkAction,
    editorSettingsLoadedErrorAction
} from "../actions/editorSettingsDetails";

export interface EditorSettingsState {
    loading: boolean;
    error?: string;
    data?: EditorSettings;
}

export const editorSettingsReducer = editorSettingsActionGroup.hashedReducer(
    ({ stage, id }) => editorSettingsKeySelector(stage, id),
    (state: EditorSettingsState | undefined, action: Action): EditorSettingsState => {
        if (!state) {
            state = { loading: false };
        }

        if (editorSettingsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (editorSettingsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (editorSettingsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                data: action.result
            };
        }

        return state;
    }
);

export const editorSettingsPageSelector = (stage: string, id: number) => (appState: AppState) => {
    const page = appState.editorSettings[editorSettingsKeySelector(stage, id)];

    return {
        loading: page?.loading ?? false,
        data: page?.data,
        error: page?.error
    };
};

export const editorSettingsKeySelector = (stage: string, id: number) => `${stage}/editor-settings/${id}`;
