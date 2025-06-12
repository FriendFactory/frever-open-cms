import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, fork, put, takeEvery } from "redux-saga/effects";

import { ExternalSong, getExternalSongList, ExternalSongListQueryParams } from "features/search-assets/services";
import { addPopUpMessageAction } from "shared/store";
import { EXTERNAL_SONG_LIST_URL } from "urls";
import {
    externalSongListLoadingAction,
    externalSongListLoadedOkAction,
    externalSongListLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* loadExternalSongList(actionParams: { stage: string; params: ExternalSongListQueryParams }) {
    try {
        yield put(externalSongListLoadingAction(actionParams));

        const result: ExternalSong[] = yield call(getExternalSongList, actionParams.stage, actionParams.params);

        yield put(
            externalSongListLoadedOkAction({
                ...actionParams,
                result
            })
        );
    } catch (responseError) {
        yield put(
            externalSongListLoadedErrorAction({
                error: (responseError as Error).toString(),
                ...actionParams
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the External Song List. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

export function* watchExternalSongListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = EXTERNAL_SONG_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "AssetFull");
        if (!hasAccess) return;

        yield fork(loadExternalSongList, { stage: urlMatch.params.stage, params: urlMatch.query || {} });
    });
}
