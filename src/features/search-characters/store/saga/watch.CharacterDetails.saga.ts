import { call, fork, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { getCharacterDetails } from "../../services";
import { CHARACTER_DETAILS_BASE_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { Character, getUserInfo, User } from "features/user-moderation/services";
import {
    characterDetailsLoadingAction,
    characterDetailsLoadedOkAction,
    characterDetailsLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchCharacterDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHARACTER_DETAILS_BASE_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        yield fork(loadCharacterDetailsSaga, stage, id);
    });
}

export function* loadCharacterDetailsSaga(stage: string, id: number) {
    try {
        yield put(characterDetailsLoadingAction({ stage, id }));

        const character: Character = yield call(getCharacterDetails, stage, id);
        const user: User = yield call<any>(getUserInfo, { stage, selector: "id", id: character.uploaderUserId });

        const result: Character = { ...character, isMainCharacter: character.id === user.mainCharacter?.id };

        yield put(
            characterDetailsLoadedOkAction({
                stage,
                id,
                result
            })
        );
    } catch (responseError) {
        yield put(
            characterDetailsLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                id
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the character details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
