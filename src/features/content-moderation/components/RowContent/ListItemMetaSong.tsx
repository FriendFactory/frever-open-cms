import React from "react";
import { Link } from "react-router-dom";
import { List, Space, Typography } from "antd";

import { EXTERNAL_SONG_DETAILS_URL } from "urls";

interface ListItemMetaSongProps {
    stage: string;
    id: number;
    name?: string;
    order: number;
}

export const ListItemMetaSong = ({ stage, order, id, name }: ListItemMetaSongProps) => (
    <List.Item.Meta
        title={
            <Space size="middle">
                <Link to={EXTERNAL_SONG_DETAILS_URL.format({ stage, id: id })} target="_blank">
                    {name}
                </Link>
                <Typography.Text type="secondary">{`#${order + 1}`}</Typography.Text>
            </Space>
        }
        description={`ID: ${id}`}
    />
);
