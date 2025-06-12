import { request } from "shared";

export async function resetStageCache(stageId: string): Promise<any> {
    const response = await request(stageId).assetmanager().post("api/cache/reset");

    if (response.status !== 204) {
        throw new Error(`Status code: ${response.status}.`);
    }
}
