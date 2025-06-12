import { Action } from "redux";

import { Playlist } from "features/external-music/services";
import { externalPlaylistLoadedOkAction, playlistDetailsLoadedOkAction, playlistsLoadedOkAction } from "../../actions";

export interface PlaylistsEntitiesState {
    [x: string]: Playlist;
}

export const playlistsEntitiesReducer = (
    state: PlaylistsEntitiesState | undefined,
    action: Action
): PlaylistsEntitiesState => {
    if (!state) {
        state = {};
    }

    if (playlistsLoadedOkAction.is(action)) {
        const newState = action.result.reduce<PlaylistsEntitiesState>((acc, el) => {
            acc[el.id] = el;
            return acc;
        }, {});

        return { ...state, ...newState };
    }

    if (playlistDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [action.result.id]: {
                ...action.result,
                externalPlaylist: { ...state[action.result.id]?.externalPlaylist, ...action.result.externalPlaylist }
            }
        };
    }

    if (externalPlaylistLoadedOkAction.is(action)) {
        const value = Object.entries(state).find(
            ([_, value]) => value.externalPlaylistId === action.externalPlaylist.id
        );

        if (value) {
            const [key, playlist] = value;
            return { ...state, [key]: { ...playlist, externalPlaylist: action.externalPlaylist } };
        }
    }

    return state;
};
