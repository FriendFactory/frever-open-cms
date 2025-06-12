import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE, RouterLocation } from "connected-react-router";

import { checkUserAccess } from "shared/checkUserAccess";
import { getPromotedSongList, PromotedSong, PromotedSongListQueryParams } from "features/promoted-songs/services";
import { ResultWithCount } from "shared";
import { PROMOTED_SONG_LIST_URL } from "urls";
import { loadPromotedSongNamesSaga } from "./loadPromotedSongNamesSaga";
import {
    promotedSongListLoadingAction,
    promotedSongListLoadedOkAction,
    promotedSongListLoadedErrorAction,
    promotedSongListLoadAction
} from "../actions";

export function* watchPromotedSongListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
        if (!hasAccess) return;

        yield* promotedSongListPageWorker(action.payload.location);
    });

    yield takeEvery(
        promotedSongListLoadAction.TYPE,
        function* (action: typeof promotedSongListLoadAction.typeOf.action) {
            const hasAccess: boolean = yield call(checkUserAccess, "CategoriesFull");
            if (!hasAccess) return;

            yield spawn(promotedSongListWorker, action.stage, action.params);
        }
    );
}

export function* promotedSongListPageWorker(location: Location | RouterLocation<any>) {
    const urlMatch = PROMOTED_SONG_LIST_URL.match(location, true);
    if (urlMatch.isMatched) yield spawn(promotedSongListWorker, urlMatch.params.stage, urlMatch.query || {});
}

export function* promotedSongListWorker(stage: string, params: PromotedSongListQueryParams) {
    try {
        yield put(promotedSongListLoadingAction({ stage, params }));

        const result: ResultWithCount<PromotedSong> = yield call(getPromotedSongList, stage, params);

        yield spawn(loadPromotedSongNamesSaga, stage, result.data);

        yield put(promotedSongListLoadedOkAction({ stage, params, result }));
    } catch (e) {
        yield put(promotedSongListLoadedErrorAction({ stage, params, error: (e as Error).toString() }));
    }
}
