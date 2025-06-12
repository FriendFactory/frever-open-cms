import { all } from "redux-saga/effects";

import { watchCharacterDetailsSaga } from "./watch.CharacterDetails.saga";
import { watchCharacterListSaga } from "./watch.CharacterList.saga";
import { watchUpdateCharacterSaga } from "./watch.UpdateCharacter.saga";
import { watchUpdateThumbnailSaga } from "./watch.UpdateThumbnail.saga";
import { watchUpdateUmaRecipeSaga } from "./watch.UpdateUmaRecipe.saga";
import { watchCharacterBakedViewsSaga } from "./watchCharacterBakedViewSaga";

export function* characterSaga() {
    yield all([
        watchCharacterListSaga(),
        watchCharacterDetailsSaga(),
        watchUpdateCharacterSaga(),
        watchUpdateThumbnailSaga(),
        watchUpdateUmaRecipeSaga(),
        watchCharacterBakedViewsSaga()
    ]);
}
