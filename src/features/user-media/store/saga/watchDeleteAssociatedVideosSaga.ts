import { fork, takeEvery } from "redux-saga/effects";

import { executeVideosDeleteSaga } from "shared/store/saga/executeVideosDeleteSaga";
import { userSoundDeleteAssociatedVideos } from "../actions";
import { loadUserMediaFileEntityWorker } from "./loadUserMediaFileEntityWorker";

export function* watchDeleteAssociatedVideosSaga() {
    yield takeEvery(
        userSoundDeleteAssociatedVideos.TYPE,
        function* (action: typeof userSoundDeleteAssociatedVideos.typeOf.action) {
            const { stage, selectBy, id, command } = action;

            yield* executeVideosDeleteSaga(stage, selectBy, id, command);
            yield fork(loadUserMediaFileEntityWorker, stage, "UserSound", id);
        }
    );
}
