import { request } from "shared";
import { WardrobeAsset } from "./api";

export async function executeGenderGroupCommand(
    stage: string,
    wardrobeId: number,
    genderGroupId?: number
): Promise<WardrobeAsset["wardrobeGenderGroup"]> {
    const method = genderGroupId ? "patch" : "post";

    const response = await request(stage)
        .assetmanager()
        [method]("api/wardrobeGenderGroup", {
            id: genderGroupId,
            wardrobe: [{ id: wardrobeId }]
        });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}. ${response.statusText}`);
}
