import { request } from "shared";
import { CharacterSpawnPositionSetLocation } from "./api";

export async function getSetLocationOfSpawnPosition(
    stage: string,
    id: number
): Promise<CharacterSpawnPositionSetLocation> {
    const query = `?&$filter=setLocationAndCharacterSpawnPosition/any(entity: entity/characterSpawnPositionId eq ${id})&$top=1&$select=id, name, readinessId, isExcludedFromLists`;

    const response = await request(stage)
        .assetmanager()
        .get("api/setLocation" + query);

    if (response.status === 200 && response.data?.[0]) {
        return response.data[0];
    }

    throw new Error(`Status code: ${response.status}.`);
}
