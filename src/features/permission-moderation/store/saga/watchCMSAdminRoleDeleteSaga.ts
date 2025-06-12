import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { cmsAdminRoleDeleteAction } from "../actions";
import { deleteAdminRole } from "features/permission-moderation/services";
import { loadCMSAdminRoleList } from "./watchCMSAdminRoleListSaga";
import { CMS_ADMIN_ROLES_PAGE_URL } from "urls";

export function* watchCMSAdminRoleDeleteSaga() {
    yield takeEvery(cmsAdminRoleDeleteAction.TYPE, function* (action: typeof cmsAdminRoleDeleteAction.typeOf.action) {
        const urlMatch = CMS_ADMIN_ROLES_PAGE_URL.match(location, true);
        if (!urlMatch.isMatched) return;

        const { stage } = urlMatch.params;

        try {
            yield call(deleteAdminRole, stage, action.id);
            yield* loadCMSAdminRoleList(stage);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete role ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}
