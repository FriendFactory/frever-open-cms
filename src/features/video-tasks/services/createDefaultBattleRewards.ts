import { request } from "shared";

const defaultSoftCurrency = 0;

export async function createDefaultBattleRewards(stage: string, taskId: number) {
    const response = await request(stage).assetmanager().post(`api/battle/reward/${taskId}/${defaultSoftCurrency}`);
    if (response.status === 204) return;
    throw new Error(`Status code: ${response.status}`);
}
