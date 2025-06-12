import { call, put, takeEvery } from "redux-saga/effects";

import { loadTaskAssetsAction, taskDetailsLoadingAction, updateTaskAssetsAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { Task, updateTaskAssets } from "features/video-tasks/services";
import { putTaskDetailsSaga } from "./watch.TaskDetails.saga";

export function* watchUpdateTaskAssetsSaga() {
    yield takeEvery(updateTaskAssetsAction.TYPE, function* (action: typeof updateTaskAssetsAction.typeOf.action) {
        try {
            yield put(
                taskDetailsLoadingAction({
                    stage: action.stage,
                    id: action.data.id
                })
            );

            const result: Task = yield call(updateTaskAssets, action.stage, action.data);

            yield* putTaskDetailsSaga(action.stage, action.data.id, result);

            if (result.assets?.length) {
                yield put(loadTaskAssetsAction({ stage: action.stage, task: result }));
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update Task assets. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
