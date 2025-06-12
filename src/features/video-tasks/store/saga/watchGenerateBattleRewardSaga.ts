import { put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";

import { generateBattleRewardsAction } from "../actions";
import { loadTaskBattleRewardsSaga } from "./loadTaskBattleRewardsSaga";
import { prefillBattleRewards } from "./prefillBattleRewardsSaga";
import { defaultBattleRewards } from "features/video-tasks/constants";

export function* watchGenerateBattleRewardSaga() {
    yield takeEvery(
        generateBattleRewardsAction.TYPE,
        function* (action: typeof generateBattleRewardsAction.typeOf.action) {
            try {
                yield* prefillBattleRewards(action.stage, action.taskId, defaultBattleRewards);

                yield spawn(loadTaskBattleRewardsSaga, action.stage, action.taskId);

                yield put(
                    addPopUpMessageAction({
                        messageText: "Success. Default Battle Reward created",
                        messageStyle: "success"
                    })
                );
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to create Default Battle Reward. ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}
