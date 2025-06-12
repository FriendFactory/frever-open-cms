import { request } from "shared";

export async function boostUserXp(stage: string, groupId: number, xp: number): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/profile/${groupId}/xp`, { xp });

    if (response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
