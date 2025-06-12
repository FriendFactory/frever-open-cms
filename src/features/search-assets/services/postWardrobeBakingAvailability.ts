import { request } from "shared";

export interface WardrobeBakingAvailability {
    wardrobeId: number;
    isAvailable: boolean;
    reason?: string;
}

export async function postWardrobeBakingAvailability(
    stage: string,
    data: Partial<WardrobeBakingAvailability>
): Promise<undefined> {
    const response = await request(stage)
        .assetmanager()
        .post("api/asset/moderation/wardrobe/baking/availability", data);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
