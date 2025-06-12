import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { postEntity } from "shared";
import { TASK_DETAILS_URL } from "urls";
import { taskDetailsLoadedOkAction } from "features/video-tasks/store/actions";
import { Task } from "features/video-tasks/services";
import { createTaskAction } from "../actions";
import { checkIsTaskVotingType } from "features/video-tasks/helpers";
import { prefillBattleRewards } from "./prefillBattleRewardsSaga";
import { defaultBattleRewards } from "features/video-tasks/constants";

export function* watchCreateTaskSaga() {
    yield takeEvery(createTaskAction.TYPE, function* (action: typeof createTaskAction.typeOf.action) {
        const { data, stage, battleRewards } = action;
        try {
            const result: Task = yield call(postEntity, stage, "task", {
                ...data,
                useLevelVideo: true
            });

            if (checkIsTaskVotingType(data.taskType)) {
                yield spawn(prefillBattleRewards, stage, result.id, battleRewards || defaultBattleRewards);
            }

            yield put(taskDetailsLoadedOkAction({ stage: stage, id: result.id, result }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Task created.",
                    messageStyle: "success",
                    link: TASK_DETAILS_URL.format({ stage: stage, id: result.id })
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed To Create Task. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
