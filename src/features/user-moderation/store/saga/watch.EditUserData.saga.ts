import { call, put, takeEvery } from "redux-saga/effects";

import { editUser, User } from "../../services";
import { addPopUpMessageAction } from "shared/store";
import { updateUserDataAction, updateUserDataOkAction } from "../actions";

export function* watchEditUserDataSaga() {
    yield takeEvery(updateUserDataAction.TYPE, function* (action: typeof updateUserDataAction.typeOf.action) {
        try {
            const response: User = yield call(editUser, action.stage, action.id, action.data);

            const result = Object.fromEntries(
                Object.entries(action.data).map(([key]) => [key, response[key as keyof User]])
            );

            yield put(updateUserDataOkAction({ stage: action.stage, id: action.id, result }));
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update the user data. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
