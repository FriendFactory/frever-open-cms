import { request } from "shared";

export async function deleteAdminRole(stage: string, id: number): Promise<undefined> {
    const response = await request(stage).assetmanager().delete(`api/role/moderation/role/${id}`);

    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}`);
}
