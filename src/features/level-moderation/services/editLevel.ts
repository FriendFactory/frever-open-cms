import { request } from "shared";
import { Level } from "./api";

export async function editLevel(stage: string, data: Partial<Level>): Promise<Level> {
    const response = await request(stage).assetmanager().patch("api/level/", data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code ${response.status}`);
}
