import { request } from "shared";
import { Task, TaskAsset, TaskCharacterSpawnPositions } from ".";

export interface TaskAssetsInfoToUpdate {
    id: number;
    assets: TaskAsset[];
    spawnPositions: TaskCharacterSpawnPositions[];
}

export async function updateTaskAssets(stage: string, data: TaskAssetsInfoToUpdate): Promise<Task> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage).assetmanager().post("api/task/assets", data);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
