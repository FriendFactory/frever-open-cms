import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { message } from "antd";

import { UserForm } from "features/user-moderation/components/UserDetails/UserMainTab/UserForm";
import { USER_DETAILS_INFO_URL } from "urls";
import { updateUserContactDataAction } from "../../../store";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { User } from "features/user-moderation/services";

export function UserFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = USER_DETAILS_INFO_URL.match(location);
    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const { stage } = urlMatch.params;
    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    if (!info.data) {
        return <div></div>;
    }

    const handleSubmitUserChanges = (form: Partial<User>) => {
        if (info.data?.identityServerId) {
            const data = {
                identityServerId: info.data.identityServerId,
                email: form.email?.length ? form.email : null,
                phoneNumber: form.phoneNumber?.length ? form.phoneNumber : null
            };

            dispatch(updateUserContactDataAction({ stage, id: info.data.id, data }));
        } else {
            message.error("User identityServerId is missing");
        }
    };

    return <UserForm loading={info.loading} data={info.data} handleSubmitUserChanges={handleSubmitUserChanges} />;
}
