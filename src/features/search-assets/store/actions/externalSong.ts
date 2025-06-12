import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ExternalSong } from "features/search-assets/services";

export const externalSongActionGroup = defineActionGroup<{ stage: string; id: number }>("EXTERNAL SONG DETAILS");

export const externalSongLoadingAction = externalSongActionGroup.defineAction("LOADING");

export const externalSongLoadedOkAction = externalSongActionGroup.defineAction<{
    result: ExternalSong;
}>("LOADED OK");

export const externalSongLoadedErrorAction = externalSongActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const externalSongEditAction =
    defineAction<{ stage: string; id: number; data: Partial<ExternalSong> }>("EXTERNAL STORE EDIT");
