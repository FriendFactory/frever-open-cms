import { delay, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction, clearPopUpMessageAction } from "../actions";

export function* watchPopUpMessageSaga() {
    yield takeEvery(addPopUpMessageAction.TYPE, function* () {
        yield delay(100);
        yield put(clearPopUpMessageAction({}));
    });
}
