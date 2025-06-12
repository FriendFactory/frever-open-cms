import { defineAction, defineActionGroup } from "rd-redux-utils";

import { BattleReward } from "features/video-tasks/services";

export const battleRewardsActionGroup = defineActionGroup<{ stage: string; taskId: number }>("BATTLE REWARDS");

export const battleRewardsLoadingAction = battleRewardsActionGroup.defineAction("LOADING");

export const battleRewardsLoadedOkAction =
    battleRewardsActionGroup.defineAction<{ result: BattleReward[] }>("RESPONSE OK");

export const battleRewardsLoadedErrorAction =
    battleRewardsActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

export const updateBattleRewardsAction =
    defineAction<{ stage: string; data: Partial<BattleReward> }>("UPDATE BATTLE REWARD");

export const battleRewardsUpdatedOkAction =
    defineAction<{ stage: string; result: BattleReward[] }>("BATTLE REWARD UPDATED OK");

export const generateBattleRewardsAction =
    defineAction<{ stage: string; taskId: number }>("GENERATE NEW BATTLE REWARDS");
