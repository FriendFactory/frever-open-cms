import { takeEvery } from "redux-saga/effects";
import { resetAuthAction } from "../actions";

import { resetAuth } from "../../services/storage";

export function* resetAuthSaga() {
    yield takeEvery(resetAuthAction.TYPE, function* () {
        resetAuth();
    });
}
