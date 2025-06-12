import { request } from "shared";
import { BattleReward } from "./api";

export async function updateRewardSoftCurrency(stage: string, data: Partial<BattleReward>): Promise<BattleReward> {
    const response = await request(stage).assetmanager().put("api/battle/reward", data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code ${response.status}`);
}
