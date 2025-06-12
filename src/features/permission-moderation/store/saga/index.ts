import { all } from "redux-saga/effects";

import { watchCMSAdminRoleListSaga } from "./watchCMSAdminRoleListSaga";
import { watchCMSAdminRoleUpdateSaga } from "./watchCMSAdminRoleUpdateSaga";
import { watchCMSAdminUserListSaga } from "./watchCMSAdminUserListSaga";
import { watchCMSAdminUserUpdateSaga } from "./watchCMSAdminUserUpdateSaga";
import { watchCMSAdminRoleDeleteSaga } from "./watchCMSAdminRoleDeleteSaga";

export function* permissionSaga() {
    yield all([
        watchCMSAdminRoleListSaga(),
        watchCMSAdminRoleUpdateSaga(),
        watchCMSAdminUserListSaga(),
        watchCMSAdminUserUpdateSaga(),
        watchCMSAdminRoleDeleteSaga()
    ]);
}
