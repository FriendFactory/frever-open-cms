import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { Character } from "features/user-moderation/services";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { getCharacterList, GetCharacterListParams } from "../../services";
import { CHARACTER_LIST_URL } from "urls";
import {
    characterListLoadingAction,
    characterListLoadedOkAction,
    characterListLoadedErrorAction,
    characterListLoadAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchCharacterListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHARACTER_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadCharacterList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(characterListLoadAction.TYPE, function* (action: typeof characterListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadCharacterList, action.stage, action.params || {});
    });
}

export function* loadCharacterList(stage: string, params: GetCharacterListParams) {
    try {
        yield put(characterListLoadingAction({ stage, params }));

        const result: Character[] = yield call(getCharacterList, stage, params);

        yield put(
            characterListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            characterListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the character list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
