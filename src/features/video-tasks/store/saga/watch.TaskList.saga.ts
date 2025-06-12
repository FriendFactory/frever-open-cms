import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { getTaskList, Task, TaskListQueryParams } from "../../services";
import { TASK_LIST_URL } from "urls";
import {
    taskListLoadingAction,
    taskListLoadedOkAction,
    taskListLoadedErrorAction,
    taskListLoadAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchTaskListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = TASK_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        yield spawn(loadlTaskList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(taskListLoadAction.TYPE, function* (action: typeof taskListLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;
        yield spawn(loadlTaskList, action.stage, action.params || {});
    });
}

function* loadlTaskList(stage: string, params: TaskListQueryParams) {
    try {
        yield put(taskListLoadingAction({ stage, params }));

        const result: ResultWithCount<Task> = yield call(getTaskList, stage, params);

        yield put(
            taskListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            taskListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the task list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
