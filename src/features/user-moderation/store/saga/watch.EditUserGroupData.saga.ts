import { call, put, takeEvery } from "redux-saga/effects";

import { editGroup, Group } from "../../services";
import { addPopUpMessageAction } from "shared/store";
import { updateUserGroupDataAction, updateUserGroupDataOkAction } from "../actions";

export function* watchEditUserGroupDataSaga() {
    yield takeEvery(updateUserGroupDataAction.TYPE, function* (action: typeof updateUserGroupDataAction.typeOf.action) {
        try {
            const response: Group = yield call(editGroup, action.stage, action.groupId, action.data);

            const result = Object.fromEntries(
                Object.entries(action.data).map(([key]) => [key, response[key as keyof Group]])
            );

            yield put(
                updateUserGroupDataOkAction({
                    stage: action.stage,
                    groupId: action.groupId,
                    result
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: "User group data update success.",
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update the user group data. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
