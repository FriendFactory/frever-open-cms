import { call, put, takeEvery } from "redux-saga/effects";

import { updatePlaylistDetailsAction, playlistDetailsLoadedOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import {
    ExternalPlaylist,
    Playlist,
    updateExternalPlaylist,
    updatePlaylistDetails
} from "features/external-music/services";

export function* watchUpdatePlaylistDetailsSaga() {
    yield takeEvery(
        updatePlaylistDetailsAction.TYPE,
        function* (action: typeof updatePlaylistDetailsAction.typeOf.action) {
            const { externalPlaylist, ...playlist } = action.data || {};
            let externalPlaylistResult: ExternalPlaylist | undefined;

            try {
                if (externalPlaylist) {
                    externalPlaylistResult = yield call(updateExternalPlaylist, action.stage, externalPlaylist);
                }

                const playlistResult: Playlist = yield call(updatePlaylistDetails, action.stage, playlist);

                const result: Playlist = { ...playlistResult, externalPlaylist: externalPlaylistResult };

                yield put(
                    playlistDetailsLoadedOkAction({
                        stage: action.stage,
                        id: result.id,
                        result
                    })
                );

                yield put(
                    addPopUpMessageAction({
                        messageText: "Playlist updated successfully",
                        messageStyle: "success"
                    })
                );
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
