import { all } from "redux-saga/effects";

import { watchCharactersBakingSaga } from "./watchCharactersBakingSaga";

export function* charactersBakingSaga() {
    yield all([watchCharactersBakingSaga()]);
}
