import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction, createEntityAction, updateExtraDataStateAction } from "..";
import { postEntity, ExtraDataName, ExtraDataType, Tag } from "shared/services";

export function* watchCreateEntitySaga() {
    yield takeEvery(createEntityAction.TYPE, function* (action: typeof createEntityAction.typeOf.action) {
        const { stage, entityName, data } = action;
        try {
            yield* createEntitySaga(stage, entityName, data);

            yield put(
                addPopUpMessageAction({
                    messageText: `New ${action.entityName} has been created`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to create a new ${action.entityName}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

export function* createEntitySaga<T extends ExtraDataName>(
    stage: string,
    entityName: T,
    data: Partial<ExtraDataType> | Tag
) {
    const result: ExtraDataType = yield call(postEntity, stage, entityName, data);

    yield put(
        updateExtraDataStateAction({
            stage,
            entityName,
            command: { type: "add", result }
        })
    );

    return result;
}
