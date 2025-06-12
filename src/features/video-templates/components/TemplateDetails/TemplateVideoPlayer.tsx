import React from "react";
import { Button, Card, Dropdown, Upload } from "antd";
import { MoreOutlined, RedoOutlined, UploadOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import styled from "styled-components";

export interface TemplateVideoPlayerProps {
    loading: boolean;
    videoUrl: { url: string; count: number };
    updateThumbnail: (file: any) => void;
    beforeUpload: (file: any) => void;
    videoReRequest: () => void;
    updateThumbnailFromLevel: () => void;
}

export function TemplateVideoPlayer({
    loading,
    videoUrl,
    updateThumbnail,
    beforeUpload,
    videoReRequest,
    updateThumbnailFromLevel
}: TemplateVideoPlayerProps) {
    const items: MenuItemType[] = [
        {
            key: "custom-video",
            label: (
                <Upload
                    accept={`video/mp4`}
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    customRequest={({ file }) => {
                        updateThumbnail(file);
                    }}>
                    Upload custom video
                </Upload>
            ),
            icon: <UploadOutlined />
        },
        {
            key: "level-video",
            label: "Update from the Level Video",
            icon: <RedoOutlined />,
            onClick: updateThumbnailFromLevel
        }
    ];

    return (
        <Card
            loading={loading}
            title="Thumbnail"
            extra={
                <Dropdown menu={{ items }}>
                    <Button>
                        Update <MoreOutlined />
                    </Button>
                </Dropdown>
            }>
            <Video key={videoUrl.count} onError={videoReRequest} id="templVideo" src={videoUrl.url} controls />
        </Card>
    );
}

const Video = styled.video`
    width: 100%;
`;
