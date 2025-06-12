import { Action } from "redux";

import { AppState } from "app-state";

import { externalSongLoadingAction, externalSongLoadedOkAction, externalSongLoadedErrorAction } from "../../actions";
import { externalSongActionGroup } from "features/search-assets/store";

import { externalSongKeySelector } from "./externalSong.reducer";
import { ExternalSong } from "features/search-assets/services";

export interface ExtSongDetailsPagesState {
    loading: boolean;
    error?: string;
}

export const externalSongDetailsReducer = externalSongActionGroup.hashedReducer(
    ({ stage, id }) => extSongDetailsKeySelector(stage, id),
    (state: ExtSongDetailsPagesState | undefined, action: Action): ExtSongDetailsPagesState => {
        if (!state) {
            state = { loading: false };
        }

        if (externalSongLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (externalSongLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (externalSongLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false
            };
        }

        return state;
    }
);

export interface ExternalSongDetailsPageResult {
    stage: string;
    loading: boolean;
    error?: string;
    data?: ExternalSong;
}

export function extSongDetailsSelector(
    stage: string,
    id: number
): (appState: AppState) => ExternalSongDetailsPageResult {
    return (appState) => {
        const pageStatus = appState.externalSong.details[extSongDetailsKeySelector(stage, id)];

        const entity = appState.externalSong.entities[externalSongKeySelector(stage, id)];

        return {
            stage,
            loading: pageStatus?.loading ?? false,
            data: entity,
            error: pageStatus?.error
        };
    };
}
export const extSongDetailsKeySelector = (stage: string, id: number): string => {
    return `${stage}/id:${id}`;
};
