import { call, fork, put, takeEvery } from "redux-saga/effects";

import { editLevelAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { editLevel, Level } from "features/level-moderation/services";
import { loadLevel } from "./watchLevelDetailsSaga";

export function* watchEditLevelSaga() {
    yield takeEvery(editLevelAction.TYPE, function* (action: typeof editLevelAction.typeOf.action) {
        const { stage, data } = action;
        try {
            const result: Level = yield call(editLevel, stage, data);

            yield fork(loadLevel, stage, result.id);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to edit the level. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
