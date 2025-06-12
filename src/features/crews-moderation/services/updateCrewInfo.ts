import { request } from "shared";
import { Crew } from "./api";

export async function updateCrewInfo(stage: string, data: Partial<Crew>): Promise<undefined> {
    const response = await request(stage).assetmanager().post("api/crew/moderation", data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
