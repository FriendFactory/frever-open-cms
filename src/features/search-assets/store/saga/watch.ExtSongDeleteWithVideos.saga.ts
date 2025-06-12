import { fork, takeEvery } from "redux-saga/effects";

import { executeVideosDeleteSaga } from "shared/store/saga/executeVideosDeleteSaga";
import { assetDeleteAssociatedVideos } from "..";
import { loadExternalSongSaga } from "./watch.ExternalSong.saga";

export function* watchExtSongDeleteWithVideosSaga() {
    yield takeEvery(
        assetDeleteAssociatedVideos.TYPE,
        function* (action: typeof assetDeleteAssociatedVideos.typeOf.action) {
            const { stage, selectBy, id, command } = action;
            if (selectBy !== "externalSongId") return;

            yield* executeVideosDeleteSaga(stage, selectBy, id, command);
            yield fork(loadExternalSongSaga, stage, id);
        }
    );
}
