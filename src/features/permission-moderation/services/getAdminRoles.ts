import qs from "qs";
import { request } from "shared";
import { CMS_ADMIN_ROLES_PAGE_SIZE } from "urls";
import { AdminRole } from "./api";

export interface AdminRolesQueryParams {
    roleId?: string | string[];
    email?: string;

    skip?: number;
    take?: number;
}

export async function getAdminRoles(stage: string, params?: AdminRolesQueryParams): Promise<AdminRole[]> {
    const query = {
        skip: params?.skip ?? 0,
        take: params?.take ?? CMS_ADMIN_ROLES_PAGE_SIZE
    };
    const response = await request(stage)
        .assetmanager()
        .get(`api/role/moderation/role?` + qs.stringify(query));

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
