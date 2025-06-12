import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { USER_DETAILS_INFO_URL } from "urls";
import { updateUserGroupDataAction } from "../../../store";
import { UserGroupForm } from "features/user-moderation/components/UserDetails/UserMainTab/UserGroupForm";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { Group } from "features/user-moderation/services";

export function UserGroupFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = USER_DETAILS_INFO_URL.match(location);
    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const { stage } = urlMatch.params;
    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    if (!info.data) {
        return null;
    }

    const handleOnSubmit = (form: Partial<Group>) =>
        info.data &&
        dispatch(
            updateUserGroupDataAction({
                stage,
                groupId: info.data.mainGroupId,
                data: {
                    ...form,
                    toplistPosition: form.toplistPosition ? form.toplistPosition : null
                }
            })
        );

    return <UserGroupForm loading={info.loading} data={info.data.mainGroup} handleOnSubmit={handleOnSubmit} />;
}
