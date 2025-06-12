import { request } from "shared";
import { AdminAccessScope } from "./api";

export async function getAdminAccessScopes(stage: string): Promise<AdminAccessScope[]> {
    const response = await request(stage).assetmanager().get(`api/role/moderation/access-scope`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
