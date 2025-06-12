import { call, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { addPopUpMessageAction } from "shared/store";
import { PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { Playlist } from "features/external-music/services";
import { playlistDetailsErrorAction, playlistDetailsLoadedOkAction, playlistDetailsLoadingAction } from "../actions";
import { extendPlaylist } from "./extendsPlaylist.saga";
import { getEntityById } from "shared";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchPlaylistDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = PLAYLIST_DETAILS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) {
            return;
        }

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        try {
            yield put(playlistDetailsLoadingAction({ stage, id }));

            const playlist: Playlist = yield call(getEntityById, stage, "ExternalPlaylist", id);

            const result = yield* extendPlaylist(stage, playlist, true);

            yield put(
                playlistDetailsLoadedOkAction({
                    stage,
                    id,
                    result
                })
            );
        } catch (e) {
            yield put(
                playlistDetailsErrorAction({
                    stage,
                    id,
                    error: (e as Error).toString()
                })
            );
            yield put(
                addPopUpMessageAction({
                    messageText: (e as Error).toString(),
                    messageStyle: "error"
                })
            );
        }
    });
}
