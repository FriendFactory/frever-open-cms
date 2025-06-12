import { call, put, takeEvery } from "redux-saga/effects";

import { multipleEditing } from "../../services";
import { multipleEditingAction, multipleEditingResponseAction, multipleEditingCleanStatus } from "../actions";

export function* watchMultipleEditingSaga() {
    yield takeEvery(multipleEditingAction.TYPE, function* (action: typeof multipleEditingAction.typeOf.action) {
        const { stage, itemsToEdit } = action;
        const result: boolean[] = yield call(multipleEditing, { stage, itemsToEdit });

        yield put(
            multipleEditingResponseAction({
                stage,
                itemsToEdit,
                result
            })
        );

        yield put(
            multipleEditingCleanStatus({
                stage,
                itemsToEdit
            })
        );
    });
}
