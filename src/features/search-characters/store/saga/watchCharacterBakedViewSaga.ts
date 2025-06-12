import { call, fork, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { CHARACTER_DETAILS_BASE_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { CharacterBakedView } from "features/search-characters/services";
import {
    CharacterBakedViewParams,
    getCharacterBakedView
} from "features/search-characters/services/getCharacterBakedView";
import {
    characterBakedViewLoadedErrorAction,
    characterBakedViewLoadedOkAction,
    characterBakedViewLoadingAction
} from "../actions";

export function* watchCharacterBakedViewsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHARACTER_DETAILS_BASE_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const { stage, id } = urlMatch.params;

        yield fork(loadCharacterBakedViewsList, stage, { characterId: id });
    });
}

export function* loadCharacterBakedViewsList(stage: string, params: CharacterBakedViewParams) {
    try {
        yield put(characterBakedViewLoadingAction({ stage, params }));

        const data: CharacterBakedView[] = yield call(getCharacterBakedView, stage, params);

        yield put(
            characterBakedViewLoadedOkAction({
                stage,
                params,
                data
            })
        );
    } catch (responseError) {
        yield put(
            characterBakedViewLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load character baked view. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
