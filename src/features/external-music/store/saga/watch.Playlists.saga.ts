import { all, call, put, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { addPopUpMessageAction } from "shared/store";
import { PLAYLISTS_PAGE_URL } from "urls";
import { getPlaylists, Playlist, PlaylistsQueryParams } from "features/external-music/services";
import { extendPlaylist } from "./extendsPlaylist.saga";
import {
    playlistsHandleLoadAction,
    playlistsLoadedErrorAction,
    playlistsLoadedOkAction,
    playlistsLoadingAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchPlaylistsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = PLAYLISTS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) {
            return;
        }

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        const params = urlMatch.query || {};
        const { stage } = urlMatch.params;

        yield spawn(loadPlaylists, stage, params);
    });

    yield takeEvery(playlistsHandleLoadAction.TYPE, function* (action: typeof playlistsHandleLoadAction.typeOf.action) {
        const { stage, params } = action;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield spawn(loadPlaylists, stage, params);
    });
}

export function* loadPlaylists(stage: string, params: PlaylistsQueryParams) {
    try {
        yield put(playlistsLoadingAction({ stage, params }));

        const playlists: Playlist[] = yield call(getPlaylists, stage, params);

        const result: Playlist[] = yield all(
            playlists.map(function* (el) {
                const extendedPlaylist = yield* extendPlaylist(stage, el);
                return extendedPlaylist;
            })
        );

        yield put(
            playlistsLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (e) {
        yield put(
            playlistsLoadedErrorAction({
                stage,
                params,
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
}
