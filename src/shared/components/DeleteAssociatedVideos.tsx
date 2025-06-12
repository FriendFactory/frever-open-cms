import React from "react";
import { Popconfirm, Space, Typography } from "antd";
import { Actions } from "shared/services/executeVideosDelete";

export interface DeleteAssociatedVideosProps {
    onClickAction: (action: Actions) => () => void;
}

export const DeleteAssociatedVideos = ({ onClickAction }: DeleteAssociatedVideosProps) => (
    <Space size="middle">
        <Popconfirm
            placement="leftTop"
            title="Delete with videos"
            description="This action will also delete all associated videos"
            onConfirm={onClickAction("delete")}>
            <Typography.Link type="danger">Delete with videos</Typography.Link>
        </Popconfirm>
        <Popconfirm
            placement="leftTop"
            title="Restore with videos"
            description="This action will also restore all related videos if they have been deleted before"
            onConfirm={onClickAction("post")}>
            <Typography.Link type="warning">Restore with videos</Typography.Link>
        </Popconfirm>
    </Space>
);
