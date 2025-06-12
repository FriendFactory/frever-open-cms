import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Card, Select } from "antd";

import { updateUserDataAction } from "../../../store";
import { useExtraData } from "shared/hooks/useExtraData";
import { USER_DETAILS_INFO_URL } from "urls";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";

export interface UserReadinessContainerProps {}

export function UserReadinessContainer({}: UserReadinessContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = USER_DETAILS_INFO_URL.match(location);
    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const { stage, id } = urlMatch.params;
    const info = useSelector(userDetailsPageSelector(urlMatch.params));
    const readinessList = useExtraData({ stage, name: "Readiness" });

    const updateUserPermissions = (creatorPermissionLevel: number[]) =>
        info.data && dispatch(updateUserDataAction({ stage, id: info.data.id, data: { id, creatorPermissionLevel } }));

    if (!info.data && !info.loading) {
        return null;
    }

    return (
        <Card title="Permissions" loading={info.loading && !info.data}>
            <Select
                mode="tags"
                style={{ width: "100%" }}
                value={info.data?.creatorPermissionLevel?.map((el) => el.toString()) as any}
                onChange={updateUserPermissions}
                optionFilterProp="label"
                size="large"
                options={readinessList.data?.map((el) => ({ key: el.id, value: el.id.toString(), label: el.name }))}
            />
        </Card>
    );
}
