import { call, put, takeEvery } from "redux-saga/effects";

import { externalPlaylistLoadedOkAction, removeTrackFromPlaylistAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { ExternalPlaylist, removeTrackFromPlaylist } from "features/external-music/services";

export function* watchRemoveTrackFromPlaylistSaga() {
    yield takeEvery(
        removeTrackFromPlaylistAction.TYPE,
        function* (action: typeof removeTrackFromPlaylistAction.typeOf.action) {
            try {
                const externalPlaylist: ExternalPlaylist = yield call(
                    removeTrackFromPlaylist,
                    action.stage,
                    action.externalPlaylistId,
                    action.playlistTrackId
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
        }
    );
}
