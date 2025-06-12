import React, { useState } from "react";
import { Button, Col, Modal, Row, Typography } from "antd";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { VIDEO_MODERATION_LIST_URL } from "urls";
import { executeVideoCommandByHashtagAction } from "../store";
import { VideosCommandByHashtag } from "../services";
import { hashtagByNameSelector } from "features/hashtag-moderation/store/reducer/hashtags.reducer";

export interface VideoCommandByHashtagContainerProps {}

export function VideoCommandByHashtagContainer({}: VideoCommandByHashtagContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = VIDEO_MODERATION_LIST_URL.match(location);

    if (!urlMatch.isMatched) return null;

    if (!urlMatch.query?.hashtag) return null;

    const [command, setCommand] = useState<VideosCommandByHashtag | null>(null);

    const hashtag = useSelector(hashtagByNameSelector(urlMatch.params.stage, urlMatch.query.hashtag));

    const executeCommand = (IncludeRemixes: boolean) => {
        if (command && hashtag) {
            dispatch(
                executeVideoCommandByHashtagAction({
                    stage: urlMatch.params.stage,
                    command,
                    body: { HashtagId: hashtag.id, IncludeRemixes }
                })
            );
        }
        setCommand(null);
    };

    const text = command === "hide-videos" ? "Hide all" : "Delete all";

    return hashtag ? (
        <>
            <Row gutter={16}>
                <Col>
                    <Button danger ghost onClick={() => setCommand("hide-videos")}>
                        Hide all
                    </Button>
                </Col>
                <Col>
                    <Button danger ghost onClick={() => setCommand("soft-delete-videos")}>
                        Delete all
                    </Button>
                </Col>
            </Row>
            <Modal
                destroyOnClose
                open={!!command}
                title="Confirm action"
                onCancel={() => setCommand(null)}
                footer={[
                    <Button onClick={() => setCommand(null)}>Cancel</Button>,
                    <Button danger onClick={() => executeCommand(false)}>
                        {text}
                    </Button>,
                    <Button danger onClick={() => executeCommand(true)}>
                        {text} with remixes
                    </Button>
                ]}>
                <Typography.Text type="warning">
                    Are you sure you want to delete all videos with the hashtag "{hashtag.name}"?
                </Typography.Text>
            </Modal>
        </>
    ) : null;
}
