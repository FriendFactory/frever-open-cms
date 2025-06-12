import React from "react";
import { Button, Form, Space } from "antd";
import { Video } from "features/video-moderation";

import { useCurrentStage } from "shared";
import { CloseCircleOutlined } from "@ant-design/icons";
import { VideoCard } from "features/video-moderation/components/VideoCard";
import { ThumbnailCard } from "shared/components/ThumbnailCard";

export function SendMessageMediaPreview() {
    const stage = useCurrentStage();

    return (
        <Form.Item shouldUpdate noStyle>
            {({ getFieldValue, setFieldValue }) => {
                const video: Video | undefined = getFieldValue("video");
                const file: File = getFieldValue("imageFile");

                return (
                    <Space direction="horizontal" style={{ marginTop: "8px" }}>
                        {video && (
                            <div style={{ width: "50px" }}>
                                <VideoCard target="_blank" value={video} stage={stage} showVideoInfo={false} />
                                <Button
                                    ghost
                                    danger
                                    type="primary"
                                    size="small"
                                    style={{ width: "inherit" }}
                                    onClick={() => setFieldValue("video", undefined)}>
                                    <CloseCircleOutlined />
                                </Button>
                            </div>
                        )}
                        {file && (
                            <div style={{ width: "50px" }}>
                                <ThumbnailCard
                                    aspectRatio="9/16"
                                    borderRadius="0"
                                    imageUrl={URL.createObjectURL(file)}
                                />
                                <Button
                                    ghost
                                    danger
                                    type="primary"
                                    size="small"
                                    style={{ width: "inherit" }}
                                    onClick={() => setFieldValue("imageFile", undefined)}>
                                    <CloseCircleOutlined />
                                </Button>
                            </div>
                        )}
                    </Space>
                );
            }}
        </Form.Item>
    );
}
