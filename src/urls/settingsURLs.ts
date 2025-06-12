import { AdminUsersQueryParams } from "features/permission-moderation/services";
import { BASE_PAGE_URL } from "./baseURL";

export const SETTINGS_ADMIN_BASE_URL = BASE_PAGE_URL.createChildPath("settings");
export const CMS_ADMIN_ROLES_PAGE_URL = SETTINGS_ADMIN_BASE_URL.createChildPath("cms-roles");
export const CMS_ADMIN_USERS_PAGE_URL = SETTINGS_ADMIN_BASE_URL.createChildPath<{}, AdminUsersQueryParams>("cms-users");

export const CMS_ADMIN_ROLES_PAGE_SIZE = 1000;
export const CMS_ADMIN_USERS_PAGE_SIZE = 200;
