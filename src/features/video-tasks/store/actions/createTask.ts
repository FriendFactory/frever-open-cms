import { Store } from "antd/lib/form/interface";
import { defineAction } from "rd-redux-utils";

import { BattleReward } from "features/video-tasks/services";

export type InitialBattleReward = Pick<BattleReward, "place" | "softCurrencyPayout">;

export const createTaskAction = defineAction<{
    stage: string;
    data: Store;
    battleRewards?: InitialBattleReward[];
}>("CREATE NEW TASK");
