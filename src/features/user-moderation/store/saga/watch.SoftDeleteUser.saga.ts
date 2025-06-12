import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { addPopUpMessageAction } from "shared/store";

import { softDeleteUser } from "../../services";
import { softDeleteUserAction, updateUserGroupDataOkAction } from "../actions";
import { loadUserDetails } from "./watch.UserDetails.saga";

export function* watchSoftDeleteUserSaga() {
    yield takeEvery(softDeleteUserAction.TYPE, function* (action: typeof softDeleteUserAction.typeOf.action) {
        try {
            yield call(softDeleteUser, action.stage, action.operation, action.groupId);

            if (action.operation === "undelete") {
                yield put(
                    updateUserGroupDataOkAction({
                        stage: action.stage,
                        groupId: action.groupId,
                        result: {
                            deletedAt: null
                        }
                    })
                );
            } else {
                yield spawn(loadUserDetails, { stage: action.stage, selector: "mainGroupId", id: action.groupId });
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to ${action.operation} the user. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
