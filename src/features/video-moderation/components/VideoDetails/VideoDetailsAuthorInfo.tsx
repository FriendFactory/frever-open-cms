import React from "react";
import { Card, Col, Row, Space, Tooltip, Typography, TooltipProps } from "antd";

import { USER_DETAILS_INFO_URL } from "urls";
import { AddVideoToColdStartContainer } from "features/video-moderation/containers/AddVideoToColdStartContainer";
import { ProtectedLink, useCurrentStage } from "shared";
import {
    checkIsVideoFeatured,
    Video,
    videoAccess,
    VideoAccess,
    VideoCommandType,
    VideoPatchRequest
} from "features/video-moderation/services";

interface VideoDetailsAuthorInfoProps {
    video: Video;
    remixes?: Video[];
    onSetSoftDelete: (videoId: number, isDeleted: boolean, includeRemixes: boolean) => void;
    onExecuteVideoCommand: (command: VideoCommandType) => void;
    onPatchVideo: (data: VideoPatchRequest) => void;
}

export const VideoDetailsAuthorInfo = ({
    video,
    remixes,
    onSetSoftDelete,
    onExecuteVideoCommand,
    onPatchVideo
}: VideoDetailsAuthorInfoProps) => {
    const stage = useCurrentStage();

    const handleDeleteClick = () => onSetSoftDelete(video.id, !video.isDeleted, false);
    const handleDeleteWithRemixesClick = () => onSetSoftDelete(video.id, !video.isDeleted, true);
    const handlePatchVideo = (command: keyof VideoPatchRequest, value: boolean) => onPatchVideo({ [command]: value });
    return (
        <Card title="Author info">
            <Row gutter={[24, 24]}>
                <Col xs={24} xl={12} xxl={8}>
                    Group ID:{" "}
                    <ProtectedLink
                        feature="Social"
                        to={USER_DETAILS_INFO_URL.format({
                            stage,
                            selector: "mainGroupId",
                            id: video.groupId
                        })}>
                        {video.groupId}
                    </ProtectedLink>
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Group Nickname: {video.groupNickName ?? ""}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Access:{" "}
                    {video.access === VideoAccess.Public ? (
                        <span>
                            Public{" "}
                            <Space split="|" size="small">
                                <a onClick={() => onExecuteVideoCommand("hide-video")}>Hide</a>
                                {!!remixes?.length && (
                                    <a onClick={() => onExecuteVideoCommand("hide-video-and-remixes")}>
                                        Hide with remixes
                                    </a>
                                )}
                            </Space>
                        </span>
                    ) : (
                        <span>
                            {videoAccess[video.access].name}{" "}
                            <a onClick={() => onExecuteVideoCommand("show-video")}>Make public</a>
                        </span>
                    )}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Is Deleted:{" "}
                    {video.isDeleted ? (
                        <TooltipText
                            text="Yes"
                            title={
                                video.groupId === video?.deletedByGroupId || !video.deletedByGroupId
                                    ? "Deleted by Author"
                                    : "Deleted via CMS"
                            }
                        />
                    ) : (
                        "No"
                    )}
                    &nbsp;&nbsp;
                    {video.isDeleted ? (
                        <a onClick={handleDeleteClick}>Undo</a>
                    ) : (
                        <Space split="|" size="small">
                            <a onClick={handleDeleteClick}>Delete</a>
                            {!!remixes?.length && <a onClick={handleDeleteWithRemixesClick}>Delete with remixes</a>}
                        </Space>
                    )}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Is Featured:{" "}
                    {checkIsVideoFeatured(video) ? (
                        <span>
                            Yes <a onClick={() => handlePatchVideo("isFeatured", false)}>Make not featured</a>
                        </span>
                    ) : (
                        <span>
                            No <a onClick={() => handlePatchVideo("isFeatured", true)}>Make featured</a>
                        </span>
                    )}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Allow Comments:{" "}
                    {video.allowComment ? (
                        <span>
                            Yes <a onClick={() => handlePatchVideo("allowComment", false)}>Disable comments</a>
                        </span>
                    ) : (
                        <span>
                            No <a onClick={() => handlePatchVideo("allowComment", true)}>Enable comments</a>
                        </span>
                    )}
                </Col>
                {video.startListItem && (
                    <Col xs={24} xl={12} xxl={8}>
                        <AddVideoToColdStartContainer
                            disableVideoChange
                            initialValues={{ video, startListItem: video.startListItem }}
                            button={
                                <Space>
                                    <span onClick={(e) => e.stopPropagation()}>
                                        Cold Start Position: {video.startListItem}
                                    </span>
                                    <a>Change</a>
                                </Space>
                            }
                        />
                    </Col>
                )}
            </Row>
        </Card>
    );
};

type ToolTipTextProps = {
    text: string;
} & TooltipProps;

const TooltipText = ({ text, ...tooltipProps }: ToolTipTextProps) => (
    <Tooltip {...tooltipProps}>
        <Typography.Text underline>{text}</Typography.Text>
    </Tooltip>
);
