import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { cmsAdminRoleUpdateAction } from "../actions";

import { postAdminRoles } from "features/permission-moderation/services";
import { loadCMSAdminRoleList } from "./watchCMSAdminRoleListSaga";
import { CMS_ADMIN_ROLES_PAGE_URL } from "urls";

export function* watchCMSAdminRoleUpdateSaga() {
    yield takeEvery(cmsAdminRoleUpdateAction.TYPE, function* (action: typeof cmsAdminRoleUpdateAction.typeOf.action) {
        const urlMatch = CMS_ADMIN_ROLES_PAGE_URL.match(location, true);
        if (!urlMatch.isMatched) return;

        const { stage } = urlMatch.params;
        try {
            yield call(postAdminRoles, stage, action.data);

            yield spawn(loadCMSAdminRoleList, stage);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update role ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
