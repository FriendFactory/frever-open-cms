import { all, call, put, takeEvery } from "redux-saga/effects";

import { updateEntityAction, updateExtraDataStateAction, addPopUpMessageAction, extraDataLoadAction } from "..";
import { updateEntity, CommonExtraDataType } from "shared/services";

export function* watchUpdateEntitySaga() {
    yield takeEvery(updateEntityAction.TYPE, function* (action: typeof updateEntityAction.typeOf.action) {
        try {
            const result: CommonExtraDataType | CommonExtraDataType[] = Array.isArray(action.data)
                ? yield all(
                      action.data.map(function* (el) {
                          const result: CommonExtraDataType = yield call(
                              updateEntity,
                              action.stage,
                              action.entityName,
                              el
                          );
                          return result;
                      })
                  )
                : yield call(updateEntity, action.stage, action.entityName, action.data);

            if (!action.withListUpdate) {
                yield put(
                    updateExtraDataStateAction({
                        stage: action.stage,
                        entityName: action.entityName,
                        command: { type: "update", result }
                    })
                );
            } else {
                yield put(
                    extraDataLoadAction({
                        stage: action.stage,
                        entities: [action.entityName]
                    })
                );
            }
            yield put(
                addPopUpMessageAction({
                    messageText: `${action.entityName} has been updated`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update ${action.entityName}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
