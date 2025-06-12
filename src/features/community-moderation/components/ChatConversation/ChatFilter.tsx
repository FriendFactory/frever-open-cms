import React, { useState } from "react";
import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { ChatConversationQueryParams } from "features/community-moderation/services/getChatConversation";

interface ChatFilterProps {
    handleSearch: (params: ChatConversationQueryParams) => void;
}
export const ChatFilter = ({ handleSearch }: ChatFilterProps) => {
    const [check, setCheck] = useState({
        hideVideoMessages: false,
        unreadOnly: false
    });

    const onClickCheckbox = (type: "hideVideoMessages" | "unreadOnly") => (e: CheckboxChangeEvent) => {
        setCheck((prev) => ({ ...prev, [type]: e.target.checked }));
        handleSearch({ [type]: e.target.checked });
    };

    const items: MenuProps["items"] = [
        {
            key: "unread-only",
            label: (
                <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={check.unreadOnly} onChange={onClickCheckbox("unreadOnly")}>
                        Unread only
                    </Checkbox>
                </div>
            )
        },
        {
            key: "hide-video",
            label: (
                <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={check.hideVideoMessages} onChange={onClickCheckbox("hideVideoMessages")}>
                        Hide video messages
                    </Checkbox>
                </div>
            )
        }
    ];
    return (
        <>
            <Dropdown menu={{ items }}>
                <Button ghost type="primary" size="small" icon={<FilterOutlined />} />
            </Dropdown>
        </>
    );
};
