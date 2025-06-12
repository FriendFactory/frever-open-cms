import { request } from "shared";

export interface AdminUserData {
    groupId?: number;
    roleIds: number[];
}

export async function postAdminUser(stage: string, data: AdminUserData): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/role/moderation/user`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
