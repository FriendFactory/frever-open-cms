import { combineReducers } from "redux";

import { cmsAdminRoleListReducer } from "./cmsAdminRoleListReducer";
import { cmsAdminAccessScopeListReducer } from "./cmsAdminAccessScopeListReducer";
import { cmsAdminUserListReducer } from "./cmsAdminUserListReducer";
import { cmsAdminFreverOfficialListReducer } from "./cmsAdminFreverOfficialListReducer";

export const permissionReducer = combineReducers({
    roleList: cmsAdminRoleListReducer,
    userList: cmsAdminUserListReducer,
    accessScopeList: cmsAdminAccessScopeListReducer,
    freverOfficialList: cmsAdminFreverOfficialListReducer
});
