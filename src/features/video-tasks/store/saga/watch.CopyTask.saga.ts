import { call, put, takeEvery } from "redux-saga/effects";

import { taskDetailsLoadedOkAction, copyTaskAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { Task, copyTask } from "features/video-tasks/services";
import { TASK_DETAILS_URL } from "urls";

export function* watchCopyTaskSaga() {
    yield takeEvery(copyTaskAction.TYPE, function* (action: typeof copyTaskAction.typeOf.action) {
        try {
            const result: Task = yield call(copyTask, action.stage, action.id);

            yield put(
                taskDetailsLoadedOkAction({
                    stage: action.stage,
                    id: result.id,
                    result
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Task copied success.`,
                    messageStyle: "success",
                    link: TASK_DETAILS_URL.format({ stage: action.stage, id: result.id })
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to copy Task by ID ${action.id}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
