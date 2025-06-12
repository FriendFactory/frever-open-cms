import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { createExternalPlaylist, ExternalPlaylist } from "features/external-music/services";
import { createPlaylistAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { postEntity } from "shared";
import { PLAYLISTS_PAGE_URL } from "urls";
import { loadPlaylists } from "./watch.Playlists.saga";

export function* watchCreatePlaylistSaga() {
    yield takeEvery(createPlaylistAction.TYPE, function* (action: typeof createPlaylistAction.typeOf.action) {
        const { externalPlaylist, ...playlist } = action.data;

        try {
            const externalPlaylistResult: ExternalPlaylist = yield call(
                createExternalPlaylist,
                action.stage,
                externalPlaylist
            );

            yield call(postEntity, action.stage, "ExternalPlaylist", {
                ...playlist,
                externalPlaylistId: externalPlaylistResult.id
            });

            yield put(
                addPopUpMessageAction({
                    messageText: "Playlist created successfully",
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
