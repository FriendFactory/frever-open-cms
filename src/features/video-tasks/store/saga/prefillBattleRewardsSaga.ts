import { all, call, put } from "redux-saga/effects";

import { BattleReward, getBattleRewards, updateRewardSoftCurrency } from "features/video-tasks/services";
import { createDefaultBattleRewards } from "features/video-tasks/services/createDefaultBattleRewards";
import { InitialBattleReward } from "../actions";
import { addPopUpMessageAction } from "shared/store";

export function* prefillBattleRewards(stage: string, taskId: number, defaultBattleRewards: InitialBattleReward[]) {
    try {
        const battleRewards: BattleReward[] = yield* getTaskBattleRewards(stage, taskId);

        yield all(
            defaultBattleRewards.map(function* (defaultReward) {
                yield call(updateRewardSoftCurrency, stage, {
                    ...battleRewards.find((el) => el.place === defaultReward.place),
                    ...defaultReward
                });
            })
        );
    } catch (responseError) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to prefill battle rewards. ${(responseError as Error).message}`,
                messageStyle: "error"
            })
        );
    }
}

function* getTaskBattleRewards(stage: string, taskId: number) {
    let battleRewards: BattleReward[] = yield call(getBattleRewards, stage, taskId);

    if (!battleRewards.length) {
        yield call(createDefaultBattleRewards, stage, taskId);
        battleRewards = yield call(getBattleRewards, stage, taskId);
    }

    return battleRewards;
}
