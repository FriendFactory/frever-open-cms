import { request } from "shared";
import { Race } from "./api";

export async function postRace(stage: string, data: Partial<Race>): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/race/moderation`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
