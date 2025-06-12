import React from "react";
import { Link } from "react-router-dom";
import { List, Space, Typography } from "antd";

import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { TaskVideoCard } from "features/video-tasks/components/TaskVideoCard";

interface ListItemMetaVideoProps {
    stage: string;
    id: number;
    thumbnailUrl?: string;
    order: number;
}

export const ListItemMetaVideo = ({ stage, order, id, thumbnailUrl }: ListItemMetaVideoProps) => (
    <List.Item.Meta
        avatar={
            thumbnailUrl && (
                <Link to={VIDEO_MODERATION_DETAILS_URL.format({ stage, id: id })} target="_blank">
                    <TaskVideoCard thumbnailUrl={thumbnailUrl} />
                </Link>
            )
        }
        title={
            <Space size="middle">
                <Typography.Text type="secondary">{`#${order + 1}`}</Typography.Text>
            </Space>
        }
        description={`ID: ${id}`}
    />
);
