import { all, call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { cmsAdminUserUpdateAction } from "../actions";
import {
    AdminUserData,
    getLinkedFreverofficialGroupList,
    LinkedFreverofficialGroup,
    postAdminUser,
    postLinkAdminUserToFreverOfficial
} from "features/permission-moderation/services";
import { loadCMSAdminUserList } from "./watchCMSAdminUserListSaga";
import { CMS_ADMIN_USERS_PAGE_URL } from "urls";

export function* watchCMSAdminUserUpdateSaga() {
    yield takeEvery(cmsAdminUserUpdateAction.TYPE, function* (action: typeof cmsAdminUserUpdateAction.typeOf.action) {
        const urlMatch = CMS_ADMIN_USERS_PAGE_URL.match(location, true);
        if (!urlMatch.isMatched) return;
        const { stage } = urlMatch.params;

        const data: AdminUserData = {
            groupId: action.data.groupId,
            roleIds: action.data.roles.map((role) => role.id)
        };

        try {
            yield call(postAdminUser, stage, data);
            yield* updateLinksToFreverOfficial(stage, action.data.groupId, action.data.freverOfficialGroupIds);
            yield* loadCMSAdminUserList(stage, urlMatch.query || {});
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

export function* updateLinksToFreverOfficial(stage: string, groupId: number, freverOfficialGroupIds: number[]) {
    const linkedFreverOfficial: LinkedFreverofficialGroup[] = yield call(getLinkedFreverofficialGroupList, stage);
    const currentGroupIds = linkedFreverOfficial
        .filter((val) => val.groupId === groupId)
        .map((val) => val.freverOfficialGroupId);

    const groupIdsToAdd = freverOfficialGroupIds.filter((id) => !currentGroupIds.includes(id));

    const groupIdsToRemove = currentGroupIds.filter((id) => !freverOfficialGroupIds.includes(id));

    const updateCalls = [
        ...groupIdsToAdd.map((id) => call(postLinkAdminUserToFreverOfficial, stage, groupId, id)),
        ...groupIdsToRemove.map((id) => call(postLinkAdminUserToFreverOfficial, stage, groupId, id))
    ];

    yield all(updateCalls);
}
