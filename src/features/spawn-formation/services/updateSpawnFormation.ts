import { request } from "shared";
import { CharacterSpawnPositionFormation } from "./api";

export async function updateSpawnFormation(
    stage: string,
    data: CharacterSpawnPositionFormation
): Promise<CharacterSpawnPositionFormation> {
    const response = await request(stage).assetmanager().patch(`api/characterSpawnPositionFormation`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
