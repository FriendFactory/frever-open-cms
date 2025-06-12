import { all } from "redux-saga/effects";

import { watchCopyTaskSaga } from "./watch.CopyTask.saga";
import { watchCopyTaskAssetsSaga } from "./watch.CopyTaskAssets.saga";
import { watchCreateTaskSaga } from "./watch.CreateTask.saga";
import { watchCustomTaskThumbnailSaga } from "./watch.CustomTaskThumbnail.saga";
import { watchLoadTaskAssetsSaga } from "./watch.LoadTaskAssets.saga";
import { watchTaskDetailsSaga } from "./watch.TaskDetails.saga";
import { watchTaskListSaga } from "./watch.TaskList.saga";
import { watchUpdateTaskSaga } from "./watch.UpdateTask.saga";
import { watchUpdateTaskAssetsSaga } from "./watch.UpdateTaskAssets.saga";
import { watchUpdateBattleRewardSaga } from "./watchUpdateBattleRewardSaga";
import { watchGenerateBattleRewardSaga } from "./watchGenerateBattleRewardSaga";

export function* taskSaga() {
    yield all([
        watchTaskListSaga(),
        watchTaskDetailsSaga(),
        watchUpdateTaskSaga(),
        watchCustomTaskThumbnailSaga(),
        watchUpdateTaskAssetsSaga(),
        watchLoadTaskAssetsSaga(),
        watchCopyTaskSaga(),
        watchCreateTaskSaga(),
        watchCopyTaskAssetsSaga(),
        watchUpdateBattleRewardSaga(),
        watchGenerateBattleRewardSaga()
    ]);
}
