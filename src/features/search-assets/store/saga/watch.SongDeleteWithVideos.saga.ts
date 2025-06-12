import { fork, takeEvery } from "redux-saga/effects";

import { executeVideosDeleteSaga } from "shared/store/saga/executeVideosDeleteSaga";
import { assetDeleteAssociatedVideos } from "..";
import { loadAssetSaga } from "./watch.AssetDetails.saga";

export function* watchSongDeleteWithVideosSaga() {
    yield takeEvery(
        assetDeleteAssociatedVideos.TYPE,
        function* (action: typeof assetDeleteAssociatedVideos.typeOf.action) {
            const { stage, selectBy, id, command } = action;
            if (selectBy !== "songId") return;

            yield* executeVideosDeleteSaga(stage, selectBy, id, command);
            yield fork(loadAssetSaga, stage, "Song", id);
        }
    );
}
