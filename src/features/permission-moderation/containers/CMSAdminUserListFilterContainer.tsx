import React, { useCallback } from "react";
import { Input, Select, Space, Typography } from "antd";
import { useHistory, useLocation } from "react-router";

import { CMS_ADMIN_USERS_PAGE_URL } from "urls";
import { useSelector } from "react-redux";
import { permissionRolePageSelector } from "../store";

export interface CMSAdminUserListFilterContainerProps {}

export function CMSAdminUserListFilterContainer({}: CMSAdminUserListFilterContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = CMS_ADMIN_USERS_PAGE_URL.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;

    const permissionInfo = useSelector(permissionRolePageSelector(stage));

    const handleOnChange = useCallback(
        (field: "roleId" | "email") => (value: string | string[]) => {
            const newUrl = CMS_ADMIN_USERS_PAGE_URL.replace(location, {}, { [field]: value });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    return (
        <Space style={{ paddingBottom: "1.5em" }} size="large" wrap>
            <Space>
                <Typography.Text>Email&thinsp;:</Typography.Text>
                <Input.Search
                    allowClear
                    defaultValue={urlMatch.query?.email}
                    style={{ width: "260px" }}
                    type="search"
                    name="email"
                    onSearch={handleOnChange("email")}
                />
            </Space>

            <Space>
                <Typography.Text>Role&thinsp;:</Typography.Text>
                <Select
                    defaultValue={urlMatch.query?.roleId}
                    style={{ width: "280px" }}
                    allowClear
                    optionFilterProp="children"
                    options={
                        permissionInfo.data &&
                        permissionInfo.data.map((role) => ({ label: role.name, value: role.id.toString() }))
                    }
                    onChange={handleOnChange("roleId")}
                />
            </Space>
        </Space>
    );
}
