import { request } from "shared";
import { Character } from "../../user-moderation/services/api";

export async function getCharacterDetails(stage: string, id: number): Promise<Character> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!id) {
        throw new Error("Id is required");
    }

    const response = await request(stage).assetmanager().get<Character>(`/api/character/${id}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
