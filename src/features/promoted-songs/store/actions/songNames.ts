import { defineAction } from "rd-redux-utils";

import { ExternalSongEntity, SongEntity } from "features/promoted-songs/services";

export const promotedSongNamesLoadedOkAction = defineAction<{
    stage: string;
    songs: SongEntity[];
    externalSongs: ExternalSongEntity[];
}>("PROMOTED SONG NAMES: LOADED OK");
