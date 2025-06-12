import { call, fork, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { CMS_ADMIN_ROLES_PAGE_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { getAdminRoles, AdminRole } from "features/permission-moderation/services";
import {
    cmsAdminRoleListLoadedErrorAction,
    cmsAdminRoleListLoadedOkAction,
    cmsAdminRoleListLoadingAction
} from "../actions";
import { loadAccessScopeListSaga } from "./loadAccessScopeListSaga";

export function* watchCMSAdminRoleListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CMS_ADMIN_ROLES_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const { stage } = urlMatch.params;
        yield fork(loadAccessScopeListSaga, stage);
        yield fork(loadCMSAdminRoleList, stage);
    });
}

export function* loadCMSAdminRoleList(stage: string) {
    yield put(cmsAdminRoleListLoadingAction({ stage }));
    try {
        const result: AdminRole[] = yield call(getAdminRoles, stage);

        yield put(cmsAdminRoleListLoadedOkAction({ stage, result }));
    } catch (responseError) {
        yield put(
            cmsAdminRoleListLoadedErrorAction({
                stage,
                error: (responseError as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load role list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
