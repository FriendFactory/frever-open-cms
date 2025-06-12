import { defineAction } from "rd-redux-utils";
import { PlaylistTrackInfo, ExternalPlaylist } from "features/external-music/services";

export const addTracksToPlaylistAction = defineAction<{
    stage: string;
    externalPlaylistId: string;
    tracks: PlaylistTrackInfo[];
}>("ADD TRACKS TO EXTERNAL PLAYIST");

export const removeTrackFromPlaylistAction = defineAction<{
    stage: string;
    externalPlaylistId: string;
    playlistTrackId: string;
}>("REMOVE TRACK FROM EXTERNAL PLAYIST");

export const externalPlaylistLoadedOkAction =
    defineAction<{ externalPlaylist: ExternalPlaylist }>("EXTERNAL PLAYLIST LOADED OK");

export const replaceExternalPlayistAction = defineAction<{
    stage: string;
    playlist: Partial<ExternalPlaylist>;
}>("REPLACE EXTERNAL PLAYLIST");
