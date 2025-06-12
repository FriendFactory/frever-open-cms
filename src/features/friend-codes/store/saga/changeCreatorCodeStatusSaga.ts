import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { changeCreatorCodeStatus } from "../../services";
import { changeCreatorCodeStatusAction, creatorCodeUpsertFinishedAction } from "../actions/creatorCodes";

export function* changeCreatorCodeStatusSaga() {
    yield takeEvery(
        changeCreatorCodeStatusAction.TYPE,
        function* (action: typeof changeCreatorCodeStatusAction.typeOf.action) {
            try {
                yield call(changeCreatorCodeStatus, action.stage, action.data.id);

                yield put(
                    creatorCodeUpsertFinishedAction({
                        stage: action.stage,
                        data: { ...action.data, isEnabled: !action.data.isEnabled }
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to change star creator code status. ${(
                            responseError as Error
                        ).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
