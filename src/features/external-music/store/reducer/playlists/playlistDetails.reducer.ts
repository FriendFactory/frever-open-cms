import { Action } from "redux";

import { Playlist } from "features/external-music/services";
import { AppState } from "app-state";
import {
    playlistDetailsActionGroup,
    playlistDetailsErrorAction,
    playlistDetailsLoadedOkAction,
    playlistDetailsLoadingAction
} from "../../actions";

export interface PlaylistDetailsState {
    loading: boolean;
    error?: string;
    data?: Playlist;
}

export const playlistDetailsReducer = playlistDetailsActionGroup.hashedReducer(
    (props) => props.id as any,
    (state: PlaylistDetailsState | undefined, action: Action): PlaylistDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (playlistDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (playlistDetailsErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (playlistDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false
            };
        }
        return state;
    }
);

export function playlistDetailsPageSelector(id: number): (appState: AppState) => PlaylistDetailsState {
    return (appState) => {
        const playlistDetailsState = appState.playlists.details[id];
        const data = appState.playlists.entities[id];

        return {
            loading: playlistDetailsState?.loading ?? false,
            error: playlistDetailsState?.error,
            data
        };
    };
}
