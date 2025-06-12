import React from "react";
import { Card, List, theme } from "antd";
import styled from "styled-components";

import { InboxListItem } from "./InboxListItem";
import { InboxTitle } from "./InboxTitle";
import { InboxListPageSelectorType } from "features/community-moderation/store/reducer/inboxList/listReducer";
import { InboxListQueryParams } from "features/community-moderation/services/getInboxList";

interface InboxListProps {
    info: InboxListPageSelectorType;
    pageChange: (page: number, take: number) => void;
    onSearch: (params: InboxListQueryParams) => void;
}

export function InboxList({ info, pageChange, onSearch }: InboxListProps) {
    return (
        <Card
            title={<InboxTitle info={info} pageChange={pageChange} onSearch={onSearch} />}
            bodyStyle={{ padding: "16px 0" }}
            type="inner">
            <ListStyled
                style={{
                    height: "calc(100vh - 220px)",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}>
                {info?.data?.map((item, index) => (
                    <InboxListItem key={index} item={item} />
                ))}
            </ListStyled>
        </Card>
    );
}

const ListStyled = styled(List)`
    .ant-list-item {
        padding: ${() => styledToken().paddingSM}px;
    }
`;

const styledToken = () => {
    const { token } = theme.useToken();
    return token;
};
