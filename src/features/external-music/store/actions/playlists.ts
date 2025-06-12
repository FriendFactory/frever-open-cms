import { defineActionGroup } from "rd-redux-utils";

import { Playlist, PlaylistsQueryParams } from "features/external-music/services";

export const playlistsActionGroup = defineActionGroup<{
    stage: string;
    params: PlaylistsQueryParams;
}>("MUSIC PLAYLISTS");

export const playlistsHandleLoadAction = playlistsActionGroup.defineAction("LOAD");

export const playlistsLoadingAction = playlistsActionGroup.defineAction("LOADING");

export const playlistsLoadedOkAction = playlistsActionGroup.defineAction<{
    result: Playlist[];
}>("LOADED OK");

export const playlistsLoadedErrorAction = playlistsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
