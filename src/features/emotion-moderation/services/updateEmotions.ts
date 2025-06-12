import { request } from "shared";
import { Emotion } from "./api";

export async function updateEmotions(stage: string, data: Partial<Emotion>): Promise<undefined> {
    const response = await request(stage).assetmanager().post("api/emotion/moderation", data);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
