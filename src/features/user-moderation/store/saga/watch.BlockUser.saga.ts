import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { blockUser } from "../../services";
import { updateUserGroupDataOkAction, userBlockAction } from "../actions";

export function* watchBlockUserSaga() {
    yield takeEvery(userBlockAction.TYPE, function* (action: typeof userBlockAction.typeOf.action) {
        const { groupId, stage, operation } = action;
        try {
            yield call(blockUser, stage, groupId, operation);

            yield put(
                updateUserGroupDataOkAction({
                    stage: action.stage,
                    groupId: action.groupId,
                    result: {
                        isBlocked: operation === "block"
                    }
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to ${operation} user. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
