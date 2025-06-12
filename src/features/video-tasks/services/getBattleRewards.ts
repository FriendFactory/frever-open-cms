import { request } from "shared";
import { BattleReward } from ".";

export async function getBattleRewards(stage: string, taskId: number): Promise<BattleReward[]> {
    const response = await request(stage).assetmanager().get(`api/battle/reward/${taskId}`);
    if (response.status === 200) return response.data;
    throw new Error(`Status code: ${response.status}`);
}
