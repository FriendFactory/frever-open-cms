import { call, put, takeEvery } from "redux-saga/effects";

import { editUserContactData, User } from "../../services";
import { addPopUpMessageAction } from "shared/store";
import { updateUserContactDataAction, updateUserDataOkAction } from "../actions";

export function* watchEditUserContactDataSaga() {
    yield takeEvery(
        updateUserContactDataAction.TYPE,
        function* (action: typeof updateUserContactDataAction.typeOf.action) {
            try {
                const result: Partial<User> = yield call(editUserContactData, action.stage, action.data);

                yield put(updateUserDataOkAction({ stage: action.stage, id: action.id, result }));

                yield put(
                    addPopUpMessageAction({
                        messageText: "User contact data update success.",
                        messageStyle: "success"
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `User data update failed. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
