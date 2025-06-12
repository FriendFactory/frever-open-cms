import qs from "qs";
import { request } from "shared";
import { CMS_ADMIN_USERS_PAGE_SIZE } from "urls";
import { AdminUser } from "./api";

export interface AdminUsersQueryParams {
    roleId?: string;
    email?: string;

    skip?: number;
    take?: number;
}

export async function getAdminUsers(
    stage: string,
    { skip, take, roleId, email }: AdminUsersQueryParams
): Promise<AdminUser[]> {
    const query = {
        skip: skip ?? 0,
        take: take ?? CMS_ADMIN_USERS_PAGE_SIZE,
        roleId,
        email
    };
    const response = await request(stage)
        .assetmanager()
        .get(`api/role/moderation/user?` + qs.stringify(query));

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
