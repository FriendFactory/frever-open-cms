import { request } from "shared";
import { BackgroundAI } from "../api";

export async function createBackgroundAI(stage: string, data: BackgroundAI): Promise<BackgroundAI> {
    const response = await request(stage).assetmanager().post("api/SetLocationBackgroundSettings", data);

    if (response.status === 200 || response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
