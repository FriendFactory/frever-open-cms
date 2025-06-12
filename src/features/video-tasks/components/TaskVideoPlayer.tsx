import React from "react";
import { Button, Card, Dropdown, Upload } from "antd";
import { MoreOutlined, RedoOutlined, UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";

export interface TaskVideoPlayerProps {
    loading: boolean;
    videoUrl: { url: string; count: number };
    beforeUpload: (file: any) => void;
    updateThumbnailFromLevel: () => void;
    handleVideoReRequest: () => void;
    uploadCustomVideo: (data: any) => void;
}

export function TaskVideoPlayer({
    loading,
    videoUrl,
    beforeUpload,
    updateThumbnailFromLevel,
    handleVideoReRequest,
    uploadCustomVideo
}: TaskVideoPlayerProps) {
    const items = [
        {
            key: "upload-new-video",
            icon: <UploadOutlined />,
            label: (
                <Upload
                    accept="video/mp4"
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    customRequest={({ file }) => {
                        uploadCustomVideo(file);
                    }}>
                    Upload custom video
                </Upload>
            )
        },
        {
            key: "update-from-level",
            icon: <RedoOutlined />,
            label: "Upate from the Level Video",
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
            <VideoPlayer key={videoUrl.count} onError={handleVideoReRequest} src={videoUrl.url} controls />
        </Card>
    );
}

const VideoPlayer = styled.video`
    width: 100%;
    height: auto;
    max-height: 700px;
`;
