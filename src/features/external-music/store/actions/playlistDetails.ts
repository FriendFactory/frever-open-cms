import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ExternalPlaylist, Playlist } from "features/external-music/services";

export const createPlaylistAction =
    defineAction<{ stage: string; data: Playlist & { externalPlaylist: ExternalPlaylist } }>("CREATE NEW PLAYLIST");

export const deletePlaylistAction = defineAction<{ stage: string; playlist: Playlist }>("DELETE PLAYLIST");

export const updatePlaylistDetailsAction =
    defineAction<{ stage: string; data: Partial<Playlist> }>("UPDATE PLAYLIST DETAILLS");

export const playlistDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("PLAYLIST DETAILS");

export const playlistDetailsLoadingAction = playlistDetailsActionGroup.defineAction("LOADING");

export const playlistDetailsLoadedOkAction = playlistDetailsActionGroup.defineAction<{ result: Playlist }>("LOADED OK");

export const playlistDetailsErrorAction = playlistDetailsActionGroup.defineAction<{ error: string }>("LOADED ERROR");
