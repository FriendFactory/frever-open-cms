import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { SPAWN_FORMATION_LIST_PAGE_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    spawnFormationListLoadingAction,
    spawnFormationListLoadedOkAction,
    spawnFormationListLoadedErrorAction
} from "../actions/spawnFormationList";
import {
    getSpawnFormation,
    CharacterSpawnPositionFormation,
    SpawnFormationQueryParams
} from "features/spawn-formation/services";

export function* watchSpawnFormationListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = SPAWN_FORMATION_LIST_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadSpawnFormationList, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadSpawnFormationList(stage: string, params: SpawnFormationQueryParams) {
    try {
        yield put(spawnFormationListLoadingAction({ stage, params }));

        const data: CharacterSpawnPositionFormation[] = yield call(getSpawnFormation, stage, params);

        yield put(spawnFormationListLoadedOkAction({ stage, params, data }));
    } catch (error) {
        yield put(
            spawnFormationListLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load CharacterSpawnPositionFormation list. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
