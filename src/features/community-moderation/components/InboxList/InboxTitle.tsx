import React from "react";
import { Flex, Space, Spin, Typography } from "antd";

import { InboxPagination } from "./InboxPagination";
import { InboxListPageSelectorType } from "features/community-moderation/store/reducer/inboxList/listReducer";
import { LoadingOutlined } from "@ant-design/icons";
import { InboxListQueryParams } from "features/community-moderation/services/getInboxList";
import { InboxFilter } from "./InboxFilter";

interface InboxTitleProps {
    info: InboxListPageSelectorType;
    pageChange: (page: number, take: number) => void;
    onSearch: (params: InboxListQueryParams) => void;
}

export function InboxTitle({ info, pageChange, onSearch }: InboxTitleProps) {
    return (
        <Flex justify="space-between" align="center">
            <Space size="small">
                <Typography.Text>Inbox</Typography.Text>
                <Spin spinning={info.loading} indicator={<LoadingOutlined spin />} />
            </Space>
            <Space size="small">
                <InboxFilter onSearch={onSearch} />
                <InboxPagination
                    pageChange={pageChange}
                    currentPage={info.currentPage}
                    total={info.total}
                    pageSize={info.pageSize}
                />
            </Space>
        </Flex>
    );
}
