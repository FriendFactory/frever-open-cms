import { defineActionGroup } from "rd-redux-utils";

import { AdminUser } from "../../services";

export const cmsAdminUserListActionGroup = defineActionGroup<{ stage: string }>("CMS ADMIN USER LIST");

export const cmsAdminUserListLoadingAction = cmsAdminUserListActionGroup.defineAction("LOADING");

export const cmsAdminUserListLoadedOkAction =
    cmsAdminUserListActionGroup.defineAction<{ result: AdminUser[] }>("LOADED OK");

export const cmsAdminUserListLoadedErrorAction =
    cmsAdminUserListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const cmsAdminUserUpdateAction =
    cmsAdminUserListActionGroup.defineAction<{ data: AdminUser }>("UPDATE CMS ADMIN USER");
