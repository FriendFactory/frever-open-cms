import React from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { User } from "../services";
import { CurrencyContainer } from "../containers/UserCommands";

export interface UserTableCommandProps {
    stage: string;
    users?: User[];
}

export function UserTableCommand({ stage, users }: UserTableCommandProps) {
    const items = [
        {
            label: (
                // Without wrapper with stopPropagation arrow keys will not work. It is a bug in ANTD menu component (rc-menu) or just weird logic.
                <div onKeyDown={(e) => e.stopPropagation()}>
                    <CurrencyContainer stage={stage} users={users} />
                </div>
            ),
            key: "add-currency"
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
}
