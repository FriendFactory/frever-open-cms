import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery, fork } from "redux-saga/effects";

import { ExternalSong, getAssetDetails } from "../../services";
import { EXTERNAL_SONG_DETAILS_URL } from "urls";
import { externalSongLoadingAction, externalSongLoadedOkAction, externalSongLoadedErrorAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { checkUserAccess } from "shared/checkUserAccess";

export function* loadExternalSongSaga(stage: string, id: number) {
    const actionParams = { stage, id };
    try {
        yield put(externalSongLoadingAction(actionParams));

        const result: ExternalSong = yield call(getAssetDetails, stage, "ExternalSong", id);

        yield put(
            externalSongLoadedOkAction({
                ...actionParams,
                result
            })
        );
    } catch (responseError) {
        yield put(
            externalSongLoadedErrorAction({
                ...actionParams,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the Asset Details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

export function* watchExternalSongDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EXTERNAL_SONG_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield fork(loadExternalSongSaga, urlMatch.params.stage, urlMatch.params.id);
    });
}
