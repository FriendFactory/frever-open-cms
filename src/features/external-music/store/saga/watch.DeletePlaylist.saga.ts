import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { deleteExternalPlaylist, deletePlaylist } from "features/external-music/services";
import { deletePlaylistAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { PLAYLISTS_PAGE_URL } from "urls";
import { loadPlaylists } from "./watch.Playlists.saga";

export function* watchDeletePlaylistSaga() {
    yield takeEvery(deletePlaylistAction.TYPE, function* (action: typeof deletePlaylistAction.typeOf.action) {
        try {
            yield call(deleteExternalPlaylist, action.stage, action.playlist.externalPlaylistId);

            yield call(deletePlaylist, action.stage, action.playlist.id);

            yield put(
                addPopUpMessageAction({
                    messageText: "Playlist deleted successfully",
                    messageStyle: "success"
                })
            );

            const urlMatch = PLAYLISTS_PAGE_URL.match(location, true);
            if (urlMatch.isMatched) {
                yield spawn(loadPlaylists, urlMatch.params.stage, urlMatch.query || {});
            }
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: (e as Error).toString(),
                    messageStyle: "error"
                })
            );
        }
    });
}
