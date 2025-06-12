import { defineActionGroup } from "rd-redux-utils";

import { AdminAccessScope } from "../../services";

export const cmsAdminAccessScopeListActionGroup = defineActionGroup<{ stage: string }>("CMS ADMIN ACCESS SCOPE LIST");

export const cmsAdminAccessScopeListLoadingAction = cmsAdminAccessScopeListActionGroup.defineAction("LOADING");

export const cmsAdminAccessScopeListLoadedOkAction =
    cmsAdminAccessScopeListActionGroup.defineAction<{ result: AdminAccessScope[] }>("LOADED OK");

export const cmsAdminAccessScopeListLoadedErrorAction =
    cmsAdminAccessScopeListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
