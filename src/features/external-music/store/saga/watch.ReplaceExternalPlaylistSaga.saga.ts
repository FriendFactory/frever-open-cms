import { call, put, takeEvery } from "redux-saga/effects";

import { externalPlaylistLoadedOkAction, replaceExternalPlayistAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { ExternalPlaylist, updateExternalPlaylist } from "features/external-music/services";

export function* replaceExternalPlaylistSaga() {
    yield takeEvery(
        replaceExternalPlayistAction.TYPE,
        function* (action: typeof replaceExternalPlayistAction.typeOf.action) {
            try {
                const externalPlaylist: ExternalPlaylist = yield call(
                    updateExternalPlaylist,
                    action.stage,
                    action.playlist,
                    true
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
