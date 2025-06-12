import React from "react";
import { Link } from "react-router-dom";
import { List, Space, Typography } from "antd";

import { createCdnURLFromFiles, ThumbnailFile } from "shared";
import { TEMPLATE_DETAILS_URL } from "urls";
import { TaskVideoCard } from "features/video-tasks/components/TaskVideoCard";

interface ListItemMetaTemplateProps {
    stage: string;
    id: number;
    name?: string;
    files?: ThumbnailFile[];
    order: number;
}

export const ListItemMetaTemplate = ({ stage, order, id, name, files }: ListItemMetaTemplateProps) => (
    <List.Item.Meta
        avatar={
            files && (
                <TaskVideoCard
                    thumbnailUrl={
                        createCdnURLFromFiles({
                            stage,
                            entityType: "Template",
                            id,
                            files,
                            resolution: "512x512"
                        }) || "/assets/no-image.png"
                    }
                />
            )
        }
        title={
            <Space size="middle">
                <Link to={TEMPLATE_DETAILS_URL.format({ stage, id: id })} target="_blank">
                    {name}
                </Link>
                <Typography.Text type="secondary">{`#${order + 1}`}</Typography.Text>
            </Space>
        }
        description={`ID: ${id}`}
    />
);
