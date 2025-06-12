import { defineActionGroup } from "rd-redux-utils";

import { AdminRole, AdminRoleData } from "../../services";

export const cmsAdminRoleListActionGroup = defineActionGroup<{ stage: string }>("CMS ADMIN ROLE LIST");

export const cmsAdminRoleListLoadingAction = cmsAdminRoleListActionGroup.defineAction("LOADING");

export const cmsAdminRoleListLoadedOkAction =
    cmsAdminRoleListActionGroup.defineAction<{ result: AdminRole[] }>("LOADED OK");

export const cmsAdminRoleListLoadedErrorAction =
    cmsAdminRoleListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const cmsAdminRoleUpdateAction =
    cmsAdminRoleListActionGroup.defineAction<{ data: AdminRoleData }>("UPDATE CMS ADMIN ROLE");

export const cmsAdminRoleDeleteAction =
    cmsAdminRoleListActionGroup.defineAction<{ id: number }>("DELETE CMS ADMIN ROLE");
