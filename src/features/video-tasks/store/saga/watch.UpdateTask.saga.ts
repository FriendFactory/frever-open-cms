import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { updateTaskAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { Task, updateTask } from "features/video-tasks/services";
import { handleTagList } from "shared/store/saga/handleTagList.saga";
import { putTaskDetailsSaga } from "./watch.TaskDetails.saga";
import { checkIsTaskVotingType } from "features/video-tasks/helpers";
import { loadTaskBattleRewardsSaga } from "./loadTaskBattleRewardsSaga";

export function* watchUpdateTaskSaga() {
    yield takeEvery(updateTaskAction.TYPE, function* (action: typeof updateTaskAction.typeOf.action) {
        try {
            const value = { ...action.data };

            if (!!value.tags) {
                value.tags = yield* handleTagList(action.stage, value.tags);
            }

            if (value.characterReplacement) {
                value.characterReplacement = value.characterReplacement.filter(
                    (el) => el.originalCharacterId && (el.replaceCharacterId || el.replaceWithMainCharacter)
                );
            }

            const result: Task = yield call(updateTask, action.stage, action.id, value);

            yield* putTaskDetailsSaga(action.stage, result.id, result);

            if (checkIsTaskVotingType(result.taskType)) yield spawn(loadTaskBattleRewardsSaga, action.stage, result.id);

            yield put(
                addPopUpMessageAction({
                    messageText: `Task updated successfully.`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update Task. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
