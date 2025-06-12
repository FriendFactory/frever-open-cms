import { Character } from "features/user-moderation/services";
import { request } from "shared";

export async function getLevelCharacters(stage: string, levelId: number): Promise<Character[]> {
    const response = await request(stage).assetmanager().get<{ characters: Character[] }>(`api/level/${levelId}`);

    if (response.status === 200) return response.data.characters;

    throw new Error(`Status code: ${response.status}. ${response.statusText}`);
}
