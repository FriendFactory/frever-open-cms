import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { UNIVERSE_LIST_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { ResultWithCount } from "shared";
import {
    universeListLoadingAction,
    universeListLoadedOkAction,
    universeListLoadedErrorAction,
    universeListLoadAction
} from "../actions/universeListActions";
import { getUniverseList, Universe, UniverseListQueryParams } from "features/universe-moderation/services";

export function* watchUniverseListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = UNIVERSE_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadUniverseList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(universeListLoadAction.TYPE, function* (action: typeof universeListLoadAction.typeOf.action) {
        yield spawn(loadUniverseList, action.stage, action.params);
    });
}

export function* loadUniverseList(stage: string, params: UniverseListQueryParams) {
    try {
        yield put(universeListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<Universe> = yield call(getUniverseList, stage, params);

        yield put(universeListLoadedOkAction({ stage, params, data, total: count }));
    } catch (error) {
        yield put(
            universeListLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load universes. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
