import { request } from "shared";
import { Universe } from "./api";

export async function postUniverse(stage: string, data: Partial<Universe>): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/universe/moderation`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
