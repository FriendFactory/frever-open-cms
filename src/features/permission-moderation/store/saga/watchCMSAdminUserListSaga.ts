import { call, fork, put, takeEvery } from "redux-saga/effects";
import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";

import { CMS_ADMIN_USERS_PAGE_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import {
    getAdminUsers,
    AdminUser,
    getLinkedFreverofficialGroupList,
    LinkedFreverofficialGroup,
    AdminUsersQueryParams
} from "features/permission-moderation/services";
import {
    cmsAdminUserListLoadedErrorAction,
    cmsAdminUserListLoadedOkAction,
    cmsAdminUserListLoadingAction
} from "../actions";
import { loadCMSAdminRoleList } from "./watchCMSAdminRoleListSaga";
import { loadFreverOfficialGroupList } from "./loadFreverOfficialGroupList";

export function* watchCMSAdminUserListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CMS_ADMIN_USERS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const { stage } = urlMatch.params;

        yield call(loadFreverOfficialGroupList, stage);
        yield fork(loadCMSAdminRoleList, stage);
        yield fork(loadCMSAdminUserList, stage, urlMatch.query || {});
    });
}

export function* loadCMSAdminUserList(stage: string, params: AdminUsersQueryParams) {
    yield put(cmsAdminUserListLoadingAction({ stage }));
    try {
        const users: AdminUser[] = yield call(getAdminUsers, stage, params);
        const linkedFreverOfficial: LinkedFreverofficialGroup[] = yield call(getLinkedFreverofficialGroupList, stage);

        const result: AdminUser[] = users.map((user) => {
            const linkedToUser = linkedFreverOfficial.filter((linked) => linked.groupId === user.groupId);
            return {
                ...user,
                freverOfficialGroupIds: linkedToUser.map((val) => val.freverOfficialGroupId)
            };
        });

        yield put(cmsAdminUserListLoadedOkAction({ stage, result }));
    } catch (responseError) {
        yield put(
            cmsAdminUserListLoadedErrorAction({
                stage,
                error: (responseError as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load user list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}
