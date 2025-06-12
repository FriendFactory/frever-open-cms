import { call, put, takeEvery } from "redux-saga/effects";

import { deleteEntityAction, updateExtraDataStateAction, addPopUpMessageAction } from "..";
import { deleteEntity } from "shared/services";

export function* watchDeleteEntitySaga() {
    yield takeEvery(deleteEntityAction.TYPE, function* (action: typeof deleteEntityAction.typeOf.action) {
        try {
            const id: number = yield call(deleteEntity, action.stage, action.entityName, action.entityId);

            yield put(
                updateExtraDataStateAction({
                    stage: action.stage,
                    entityName: action.entityName,
                    command: { type: "delete", id }
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `${action.entityName} has been deleted`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to deleted ${action.entityName}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
