import { Action } from "redux";

import {
    templateSortingModeLoadedOkAction,
    templateSortingModeLoadedErrorAction,
    templateSortingClearUpAction,
    templateSortingModeLoadingAction
} from "../actions";
import { AppState } from "app-state";
import { templateKeySelector } from "./templateEntitiesReducer";
import { Template } from "features/video-templates/services";

export interface TemplateSortingModeState {
    loading: boolean;
    error?: string;
    withValueCount?: number;
    restCount?: number;
    withValueLoadedCount: number;
    restLoadedCount: number;
    byId: string[];
}

const initialState = {
    loading: false,
    error: undefined,
    withValueLoadedCount: 0,
    restLoadedCount: 0,
    byId: []
};

export const templateSortingModeReducer = (
    state: TemplateSortingModeState | undefined,
    action: Action
): TemplateSortingModeState => {
    if (!state) state = { ...initialState };

    if (templateSortingModeLoadedErrorAction.is(action)) {
        return { ...state, loading: false, error: action.error };
    }

    if (templateSortingModeLoadedOkAction.is(action)) {
        return {
            loading: false,
            error: undefined,
            withValueCount: action.withValueCount ?? state.withValueCount,
            withValueLoadedCount: state.withValueLoadedCount + action.withValueLoadedCount,
            restCount: action.restCount ?? state.restCount,
            restLoadedCount: state.restLoadedCount + action.restLoadedCount,
            byId: [...state.byId, ...action.result.map((el) => templateKeySelector(action.stage, el.id))]
        };
    }

    if (templateSortingModeLoadingAction.is(action)) return { ...state, loading: true };

    if (templateSortingClearUpAction.is(action)) return { ...initialState };

    return state;
};

export const templateSortingModeSelector = (appState: AppState): TemplateSortingModeState & { data: Template[] } => {
    const pageState = appState.template.sortingMode;
    const data = pageState.byId.map((el) => appState.template.entities[el]!).filter(Boolean);

    return { ...pageState, data };
};
