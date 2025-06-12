import React, { FC, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, List, Typography } from "antd";
import styled from "styled-components";

import { Video } from "features/video-moderation/services";
import { ProtectedLink, useCurrentStage } from "shared";
import { USER_DETAILS_INFO_URL, VIDEO_MODERATION_DETAILS_URL } from "urls";

const { Text } = Typography;

interface VideoDetailsRemixesProps {
    remixes: Video[];
}

export const VideoDetailsRemixes = ({ remixes }: VideoDetailsRemixesProps) => {
    const stage = useCurrentStage();
    return (
        <Card title="Remixes">
            <List
                size="large"
                dataSource={remixes}
                renderItem={(video) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<VideoPreview video={video} />}
                            title={
                                <span style={{ fontWeight: "normal" }}>
                                    <Text>Author: </Text>
                                    <ProtectedLink
                                        target="_blank"
                                        feature="Social"
                                        to={USER_DETAILS_INFO_URL.format({
                                            stage,
                                            selector: "mainGroupId",
                                            id: video.groupId
                                        })}>{` ${video.groupNickName ?? "Unknown"}`}</ProtectedLink>
                                </span>
                            }
                            description={
                                <>
                                    <Text>Video ID: </Text>
                                    <Link to={VIDEO_MODERATION_DETAILS_URL.format({ stage, id: video.id })}>
                                        {video.id}
                                    </Link>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

interface VideoRemixListItemProps {
    video: Video;
}

const VideoPreview: FC<VideoRemixListItemProps> = ({ video }) => {
    const videoRef = useRef<HTMLVideoElement | null>();
    const onSetRef = useCallback((el: HTMLVideoElement | null) => (videoRef.current = el), [videoRef]);

    const handleMouseOver = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.playbackRate = 3;
        }
    }, [videoRef]);

    const handleMouseOut = useCallback(() => {
        if (videoRef.current) videoRef.current.pause();
    }, [videoRef]);

    return (
        <VideoRemixAvatarStyled
            muted
            loop
            src={video.thumbnailUrl}
            ref={onSetRef}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        />
    );
};

const VideoRemixAvatarStyled = styled.video`
    height: 10em;
    width: auto;
    vertical-align: middle;
`;
