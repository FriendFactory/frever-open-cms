import React, { useCallback, useState } from "react";
import { Button, Dropdown, MenuProps, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import { InboxListQueryParams } from "features/community-moderation/services/getInboxList";
import { ChatUnreadMessageFilter } from "features/community-moderation/services/api";

const { Text } = Typography;

const INBOX_FILTER = {
    "Show All": undefined,
    "Unread All": ChatUnreadMessageFilter.Any,
    "Unread Text": ChatUnreadMessageFilter.Text
} as const;

interface InboxFilterProps {
    onSearch: (params: InboxListQueryParams) => void;
}
export const InboxFilter = ({ onSearch }: InboxFilterProps) => {
    const [selectedFilter, setSelectedFilter] = useState<keyof typeof INBOX_FILTER>("Show All");

    const handleClickFilter = useCallback((value: keyof typeof INBOX_FILTER) => {
        setSelectedFilter(value);
        onSearch({ messageFilter: INBOX_FILTER[value] });
    }, []);

    const items: MenuProps["items"] = [
        {
            key: "show_all",
            label: <Text onClick={() => handleClickFilter("Show All")}>Show All</Text>
        },
        {
            key: "unread_all",
            label: <Text onClick={() => handleClickFilter("Unread All")}>Unread All</Text>
        },
        {
            key: "unread_text",
            label: <Text onClick={() => handleClickFilter("Unread Text")}>Unread Text</Text>
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <Button ghost type="primary" size="small" icon={<FilterOutlined />}>
                {selectedFilter}
            </Button>
        </Dropdown>
    );
};
