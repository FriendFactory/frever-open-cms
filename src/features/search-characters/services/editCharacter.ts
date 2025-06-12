import { Character } from "features/user-moderation/services";
import { request, ThumbnailFile } from "shared";

export interface EditCharacterFormData {
    id?: number;
    publicForBackgroundDancing?: boolean;
    publicForCreation?: boolean;
    files?: ThumbnailFile[];
    readinessId?: number;
    sortOrder?: number;
}

export async function editCharacter(stage: string, data: EditCharacterFormData): Promise<Character> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!data.id) {
        throw new Error("CharacterID is required");
    }

    const response = await request(stage)
        .assetmanager()
        .patch("api/character", JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
}
