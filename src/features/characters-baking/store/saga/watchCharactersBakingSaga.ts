import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { CHARACTERS_BAKING_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    charactersBakingLoadingAction,
    charactersBakingLoadedOkAction,
    charactersBakingLoadedErrorAction,
    charactersBakingLoadAction
} from "../actions/charactersBakingActions";
import { CharacterBakedViewStatistics } from "features/characters-baking/services/api";
import {
    CharactersBakingQueryParams,
    getAgentNames,
    getCharactersBakingStatistics
} from "features/characters-baking/services";

export function* watchCharactersBakingSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHARACTERS_BAKING_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const { stage } = urlMatch.params;

        yield* loadCharactersBakingStatistics(stage, {});
    });

    yield takeEvery(
        charactersBakingLoadAction.TYPE,
        function* (action: typeof charactersBakingLoadAction.typeOf.action) {
            yield spawn(loadCharactersBakingStatistics, action.stage, action.params);
        }
    );
}

export function* loadCharactersBakingStatistics(stage: string, params: CharactersBakingQueryParams) {
    try {
        yield put(charactersBakingLoadingAction({ stage }));

        const data: CharacterBakedViewStatistics = yield call(getCharactersBakingStatistics, stage, params);

        let agentNames: string[] = [];

        try {
            agentNames = yield call(getAgentNames, stage, {});
        } catch (error) {}

        yield put(
            charactersBakingLoadedOkAction({
                stage,
                data: { ...data, bakingMachineAgentNames: agentNames }
            })
        );
    } catch (responseError) {
        yield put(
            charactersBakingLoadedErrorAction({
                stage,
                error: (responseError as Error).toString()
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the characters baking statistics. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
