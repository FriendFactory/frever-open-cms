import { defineActionGroup } from "rd-redux-utils";

import { ExternalSong, ExternalSongListQueryParams } from "features/search-assets/services";

export const externalSongListActionGroup =
    defineActionGroup<{ stage: string; params: ExternalSongListQueryParams }>("EXTERNAL SONG LIST");

export const externalSongListLoadingAction = externalSongListActionGroup.defineAction("LOADING");

export const externalSongListLoadedOkAction = externalSongListActionGroup.defineAction<{
    result: ExternalSong[];
}>("LOADED OK");

export const externalSongListLoadedErrorAction = externalSongListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");
