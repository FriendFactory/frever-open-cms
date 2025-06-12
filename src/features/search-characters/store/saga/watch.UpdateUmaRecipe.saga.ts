import { call, fork, put, takeEvery } from "redux-saga/effects";

import { updateEntity } from "shared";
import { CHARACTER_DETAILS_BASE_URL } from "urls";
import { updateUmaRecipeAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { loadCharacterDetailsSaga } from "./watch.CharacterDetails.saga";

export function* watchUpdateUmaRecipeSaga() {
    yield takeEvery(updateUmaRecipeAction.TYPE, function* (action: typeof updateUmaRecipeAction.typeOf.action) {
        try {
            yield call(updateEntity, action.stage, "UmaRecipe", action.data);

            const urlMatch = CHARACTER_DETAILS_BASE_URL.match(location);
            if (urlMatch.isMatched) {
                yield fork(loadCharacterDetailsSaga, urlMatch.params.stage, urlMatch.params.id);
            }
            yield put(
                addPopUpMessageAction({
                    messageText: `UmaRecipe updated successfully.`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update UmaRecipe. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
