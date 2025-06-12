import { request } from "shared";

export interface AdminRoleData {
    id?: number;
    name?: string;
    accessScopes?: string[];
}

export async function postAdminRoles(stage: string, data: AdminRoleData): Promise<undefined> {
    const response = await request(stage).assetmanager().post(`api/role/moderation/role`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
