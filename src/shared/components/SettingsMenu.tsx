import { EyeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";

import { ThemeCustomizationWindow } from "./ThemeCustomizationWindow";
import { CurrentCMSUserContainer } from "features/permission-moderation/containers/CurrentCMSUserContainer";

export function SettingsMenu() {
    const items: ItemType[] = [
        {
            key: "my-roles",
            label: <CurrentCMSUserContainer />,
            icon: <UserOutlined />
        },
        {
            key: "theme",
            label: <ThemeCustomizationWindow />,
            icon: <EyeOutlined />
        }
    ];
    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <Button icon={<SettingOutlined />}></Button>
        </Dropdown>
    );
}
