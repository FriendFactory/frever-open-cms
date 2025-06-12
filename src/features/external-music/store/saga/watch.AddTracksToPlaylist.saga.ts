import { call, put, takeEvery } from "redux-saga/effects";

import { addTracksToPlaylistAction, externalPlaylistLoadedOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { addTrackToExternalPlaylist, ExternalPlaylist } from "features/external-music/services";

export function* watchAddTracksToPlaylistSaga() {
    yield takeEvery(addTracksToPlaylistAction.TYPE, function* (action: typeof addTracksToPlaylistAction.typeOf.action) {
        try {
            const externalPlaylist: ExternalPlaylist = yield call(
                addTrackToExternalPlaylist,
                action.stage,
                action.externalPlaylistId,
                action.tracks
            );

            yield put(externalPlaylistLoadedOkAction({ externalPlaylist }));
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
