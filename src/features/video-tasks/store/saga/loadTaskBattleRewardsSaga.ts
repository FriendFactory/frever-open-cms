import { call, put } from "redux-saga/effects";

import { battleRewardsLoadedErrorAction, battleRewardsLoadedOkAction, battleRewardsLoadingAction } from "../actions";
import { BattleReward, getBattleRewards } from "features/video-tasks/services";

export function* loadTaskBattleRewardsSaga(stage: string, taskId: number) {
    yield put(battleRewardsLoadingAction({ stage, taskId }));
    try {
        const result: BattleReward[] = yield call(getBattleRewards, stage, taskId);

        yield put(
            battleRewardsLoadedOkAction({
                stage,
                taskId,
                result
            })
        );
    } catch (e) {
        yield put(
            battleRewardsLoadedErrorAction({
                stage,
                taskId,
                error: (e as Error).toString()
            })
        );
    }
}
