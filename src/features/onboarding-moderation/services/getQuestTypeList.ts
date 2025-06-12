import { request } from "shared";

export async function getQuestTypeList(stage: string): Promise<string[]> {
    const response = await request(stage).assetmanager().get(`api/onboarding/moderation/quest/type`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
