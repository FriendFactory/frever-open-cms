import React from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { User } from "../services";
import {
    CurrencyContainer,
    SendMessageContainer,
    UserBlockContainer,
    UserDeleteContainer,
    UserHardDeleteContainer
} from "../containers/UserCommands";
import { BoostXPContainer } from "../containers/UserCommands/BoostXPContainer";

export interface UserCommandProps {
    stage: string;
    user: User;
}

export function UserCommand({ stage, user }: UserCommandProps) {
    const items = [
        { label: <UserBlockContainer stage={stage} user={user} />, key: "block-ublock" },
        { label: <UserDeleteContainer stage={stage} user={user} />, key: "delete-undelete" },
        {
            label: (
                // Without wrapper with stopPropagation arrow keys will not work. It is a bug in ANTD menu component (rc-menu) or just weird logic.
                <div onKeyDown={(e) => e.stopPropagation()}>
                    <CurrencyContainer stage={stage} users={[user]} />
                </div>
            ),
            key: "boost-currency"
        },
        {
            label: (
                <div onKeyDown={(e) => e.stopPropagation()}>
                    <BoostXPContainer groupId={user.mainGroupId} />
                </div>
            ),
            key: "boost-xp"
        },
        {
            label: <UserHardDeleteContainer stage={stage} user={user} />,
            key: "hard-delete"
        },
        {
            label: <SendMessageContainer groupId={user.mainGroupId} />,
            key: "Send Message"
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
}
