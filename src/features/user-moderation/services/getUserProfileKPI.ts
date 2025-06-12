import { request } from "shared";
import { UserProfileKPI } from "./api";

export async function getUserProfileKPI(stage: string, groupId: number): Promise<UserProfileKPI> {
    const response = await request(stage).assetmanager().get<UserProfileKPI>(`api/profile/${groupId}/kpi`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
