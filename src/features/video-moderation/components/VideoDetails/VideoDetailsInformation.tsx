import React from "react";
import dayjs from "dayjs";
import { Card, Col, Divider, Row } from "antd";

import { LEVEL_DETAILS_URL, TASK_DETAILS_URL } from "urls";
import { ProtectedLink, useCurrentStage } from "shared";
import { ExtraDataBundleResult } from "shared/store";
import { getVideoEditorType } from "features/video-leaderboard/helpers";
import { Video } from "features/video-moderation/services";
import { VideoActionDropdown } from "../VideoActionDropdown";

interface VideoDetailsInformationProps {
    video: Video;
    extraData: ExtraDataBundleResult<"Country" | "Language">;
}

export const VideoDetailsInformation = ({ video, extraData }: VideoDetailsInformationProps) => {
    const stage = useCurrentStage();
    return (
        <Card title="Information" extra={<VideoActionDropdown stage={stage} video={video} />}>
            <Row gutter={[24, 24]}>
                <Col xs={24} xl={12} xxl={8}>
                    Video ID: {video.id}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Level ID:{" "}
                    {video.levelId ? (
                        <ProtectedLink feature="Social" to={LEVEL_DETAILS_URL.format({ stage, id: video.levelId })}>
                            {video.levelId}
                        </ProtectedLink>
                    ) : (
                        "Unknown"
                    )}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Task ID:{" "}
                    {video.schoolTaskId ? (
                        <ProtectedLink
                            feature="VideoModeration"
                            to={TASK_DETAILS_URL.format({ stage, id: video.schoolTaskId })}>
                            {video.schoolTaskId}
                        </ProtectedLink>
                    ) : (
                        "Unknown"
                    )}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Created At: {dayjs.utc(video.createdTime).format("DD MMM YYYY  HH:mm:ss")}
                </Col>

                <Col xs={24} xl={12} xxl={8}>
                    Duration: {dayjs.duration(video.duration, "seconds").format("m:s")}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    File Size: {video.size}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Premium Music: {video.externalSongIds?.length ? "Yes" : "No"}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Editor: {getVideoEditorType(video)}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Country:{" "}
                    {extraData.bundle?.Country?.data?.find((val) => val.isoName === video.country)?.displayName ??
                        "Unknown"}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Language:{" "}
                    {extraData.bundle?.Language?.data?.find((val) => val.isoCode === video.language)?.name ?? "Unknown"}
                </Col>
                <Divider style={{ margin: 0 }} />
                <Col span={24}>Description: {video.description ? video.description : "<Null>"}</Col>
            </Row>
        </Card>
    );
};
