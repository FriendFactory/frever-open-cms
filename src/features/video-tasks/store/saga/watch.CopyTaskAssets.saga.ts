import { call, put, takeEvery } from "redux-saga/effects";

import { copyTaskAssetsAction, updateTaskAssetsAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { Task, getTaskDetails, TaskAssetsInfoToUpdate } from "features/video-tasks/services";

export function* watchCopyTaskAssetsSaga() {
    yield takeEvery(copyTaskAssetsAction.TYPE, function* (action: typeof copyTaskAssetsAction.typeOf.action) {
        try {
            const copyFromTaskInfo: Task = yield call(getTaskDetails, action.stage, action.copyFromTaskId);
            const taskInfoToUpdate: TaskAssetsInfoToUpdate = {
                id: action.targerTaskId,
                assets: copyFromTaskInfo.assets ?? [],
                spawnPositions: copyFromTaskInfo.spawnPositions ?? []
            };

            yield put(
                updateTaskAssetsAction({
                    stage: action.stage,
                    data: taskInfoToUpdate
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Task assets copied`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to copy Task assets from ${action.copyFromTaskId} to Task ${
                        action.targerTaskId
                    }. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
