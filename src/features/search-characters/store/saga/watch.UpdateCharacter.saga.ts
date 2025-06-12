import { call, put, takeEvery } from "redux-saga/effects";

import { characterDetailsLoadedOkAction, updateCharacterAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { Character } from "features/user-moderation/services";
import { editCharacter } from "features/search-characters/services";

export function* watchUpdateCharacterSaga() {
    yield takeEvery(updateCharacterAction.TYPE, function* (action: typeof updateCharacterAction.typeOf.action) {
        try {
            const result: Character = yield call(editCharacter, action.stage, action.data);

            yield put(
                characterDetailsLoadedOkAction({
                    stage: action.stage,
                    id: result.id,
                    result
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Character updated successfully.`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to edit the Character. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
