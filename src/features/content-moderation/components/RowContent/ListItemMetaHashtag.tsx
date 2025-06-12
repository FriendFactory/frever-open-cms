import React from "react";
import { Link } from "react-router-dom";
import { List, Space, Typography } from "antd";

import { HASHTAG_LIST_PAGE_URL } from "urls";

interface ListItemMetaHashtagProps {
    stage: string;
    id: number;
    name?: string;
    order: number;
}

export const ListItemMetaHashtag = ({ stage, order, id, name }: ListItemMetaHashtagProps) => (
    <List.Item.Meta
        title={
            <Space size="middle">
                <Link to={HASHTAG_LIST_PAGE_URL.format({ stage }, { name })} target="_blank">
                    {name}
                </Link>
                <Typography.Text type="secondary">{`#${order + 1}`}</Typography.Text>
            </Space>
        }
        description={`ID: ${id}`}
    />
);
