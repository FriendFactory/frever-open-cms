import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { eventsOfLevelLoadAction } from "features/video-moderation/store";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { CharacterReplacement, getTaskDetails, Task } from "../../services";
import { TASK_DETAILS_URL } from "urls";
import {
    taskDetailsLoadingAction,
    taskDetailsLoadedOkAction,
    taskDetailsLoadedErrorAction,
    loadTaskAssetsAction
} from "../actions";
import { extendCharacterReplacementSaga } from "./extendCharacterReplacement.saga";
import { checkUserAccess } from "shared/checkUserAccess";
import { loadTaskBattleRewardsSaga } from "./loadTaskBattleRewardsSaga";
import { checkIsTaskVotingType } from "features/video-tasks/helpers";

export function* watchTaskDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = TASK_DETAILS_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "VideoModeration");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        try {
            yield put(taskDetailsLoadingAction({ stage, id }));

            const result: Task = yield call(getTaskDetails, stage, id);

            if (result.levelId) yield put(eventsOfLevelLoadAction({ stage: stage, levelId: result.levelId }));

            yield* putTaskDetailsSaga(stage, id, result);

            if (checkIsTaskVotingType(result.taskType)) yield spawn(loadTaskBattleRewardsSaga, stage, result.id);

            if (result.assets?.length) yield put(loadTaskAssetsAction({ stage, task: result }));
        } catch (responseError) {
            yield put(
                taskDetailsLoadedErrorAction({
                    error: (responseError as Error).toString(),
                    id,
                    stage
                })
            );

            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to load Task details. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

export function* putTaskDetailsSaga(stage: string, id: number, task: Task) {
    const characterReplacement: CharacterReplacement[] | undefined = yield* extendCharacterReplacementSaga(stage, task);

    yield put(
        taskDetailsLoadedOkAction({
            stage,
            id,
            result: { ...task, characterReplacement }
        })
    );
}
