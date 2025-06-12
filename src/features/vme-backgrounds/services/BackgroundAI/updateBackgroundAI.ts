import { request } from "shared";
import { BackgroundAI } from "../api";

export async function updateBackgroundAI(stage: string, data: BackgroundAI): Promise<BackgroundAI> {
    const response = await request(stage).assetmanager().patch(`api/SetLocationBackgroundSettings`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
