import { all } from "redux-saga/effects";

import { watchPlaylistsSaga } from "./watch.Playlists.saga";
import { watchCreatePlaylistSaga } from "./watch.CreatePlaylist.saga";
import { watchDeletePlaylistSaga } from "./watch.DeletePlaylist.saga";
import { watchPlaylistDetailsSaga } from "./watch.PlaylistDetails.saga";
import { watchAddTracksToPlaylistSaga } from "./watch.AddTracksToPlaylist.saga";
import { watchUpdatePlaylistDetailsSaga } from "./watch.UpdatePlaylistDetails.saga";
import { watchTracksSearchSaga } from "./watch.TracksSearch.saga";
import { watchRemoveTrackFromPlaylistSaga } from "./watch.RemoveTrackFromPlaylist.saga";
import { replaceExternalPlaylistSaga } from "./watch.ReplaceExternalPlaylistSaga.saga";
import { watchTrackDetailsSaga } from "./watchTrackDetailsSaga";

export function* externalMusicSaga() {
    yield all([
        watchPlaylistsSaga(),
        watchCreatePlaylistSaga(),
        watchDeletePlaylistSaga(),
        watchUpdatePlaylistDetailsSaga(),
        watchPlaylistDetailsSaga(),
        watchAddTracksToPlaylistSaga(),
        watchTracksSearchSaga(),
        watchTrackDetailsSaga(),
        watchRemoveTrackFromPlaylistSaga(),
        replaceExternalPlaylistSaga()
    ]);
}
