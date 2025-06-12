import { defineActionGroup } from "rd-redux-utils";

import { FreverofficialGroup } from "../../services";

export const cmsAdminFreverOfficialListActionGroup = defineActionGroup<{ stage: string }>(
    "CMS ADMIN FREVER OFFICIAL LIST"
);

export const cmsAdminFreverOfficialListLoadingAction = cmsAdminFreverOfficialListActionGroup.defineAction("LOADING");

export const cmsAdminFreverOfficialListLoadedOkAction =
    cmsAdminFreverOfficialListActionGroup.defineAction<{ result: FreverofficialGroup[] }>("LOADED OK");

export const cmsAdminFreverOfficialListLoadedErrorAction =
    cmsAdminFreverOfficialListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
