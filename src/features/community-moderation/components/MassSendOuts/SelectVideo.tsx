import React from "react";
import { Divider, Form, Typography } from "antd";

import { useCurrentStage } from "shared";
import { SearchForVideoModalContainer } from "features/video-moderation/containers/SearchForVideoModalContainer";
import { VideoCard } from "features/video-moderation/components/VideoCard";

export function SelectVideo() {
    const stage = useCurrentStage();
    return (
        <Form.Item label="Video" shouldUpdate>
            {({ getFieldValue, setFieldValue, validateFields }) => {
                const video: number | undefined = getFieldValue("videoId");

                return (
                    <>
                        {video && (
                            <div style={{ width: "120px" }}>
                                <VideoCard value={video} stage={stage} />
                            </div>
                        )}

                        <SearchForVideoModalContainer
                            stage={stage}
                            btnText={video ? "Change" : "Select"}
                            onVideoClick={(video) => {
                                validateFields(["videoId"]);
                                setFieldValue("videoId", video.id);
                            }}
                        />
                        {video && (
                            <>
                                <Divider type="vertical" />
                                <Typography.Link
                                    onClick={() => {
                                        validateFields(["videoId"]);
                                        setFieldValue("videoId", null);
                                    }}
                                    type="danger">
                                    Remove
                                </Typography.Link>
                            </>
                        )}
                    </>
                );
            }}
        </Form.Item>
    );
}
