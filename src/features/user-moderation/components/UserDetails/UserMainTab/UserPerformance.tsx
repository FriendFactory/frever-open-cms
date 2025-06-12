import React from "react";
import { Card, Col, Empty, Row } from "antd";

import { VIDEO_MODERATION_LIST_URL } from "urls";
import { UserProfileKPI } from "features/user-moderation/services";
import { USER_FOLLOWER_LIST_URL } from "urls";
import { ProtectedLink } from "shared";
import { VideoAccess } from "features/video-moderation/services";

export interface UserPerformanceProps {
    loading: boolean;
    stage: string;
    kpi?: UserProfileKPI;
    mainGroupId?: number;
    creatorScore?: number;
}

export function UserPerformance({ kpi, stage, loading, mainGroupId, creatorScore }: UserPerformanceProps) {
    const colArgs = { xs: 24, md: 12, xl: 6 };
    return (
        <Card title="Performance" loading={loading}>
            {kpi ? (
                <Row gutter={[16, 16]} justify="start">
                    <Col {...colArgs}>
                        Followers:&nbsp;
                        {mainGroupId ? (
                            <ProtectedLink
                                feature="Social"
                                to={USER_FOLLOWER_LIST_URL.format(
                                    {
                                        stage,
                                        id: mainGroupId,
                                        selector: "mainGroupId",
                                        page: "followers"
                                    },
                                    { groupId: mainGroupId }
                                )}>
                                {kpi.followersCount ?? "Unknown"}
                            </ProtectedLink>
                        ) : (
                            kpi.followersCount ?? "Unknown"
                        )}
                    </Col>

                    <Col {...colArgs}>
                        Following:&nbsp;
                        {mainGroupId ? (
                            <ProtectedLink
                                feature="Social"
                                to={USER_FOLLOWER_LIST_URL.format(
                                    {
                                        stage,
                                        id: mainGroupId,
                                        selector: "mainGroupId",
                                        page: "following"
                                    },
                                    {}
                                )}>
                                {kpi.followingCount ?? "Unknown"}
                            </ProtectedLink>
                        ) : (
                            kpi.followingCount ?? "Unknown"
                        )}
                    </Col>

                    <Col {...colArgs}>
                        Public Videos:&nbsp;
                        {mainGroupId ? (
                            <ProtectedLink
                                feature="VideoModeration"
                                to={VIDEO_MODERATION_LIST_URL.format(
                                    { stage },
                                    { group: mainGroupId, access: VideoAccess.Public }
                                )}>
                                {kpi.publishedVideoCount ?? "Unknown"}
                            </ProtectedLink>
                        ) : (
                            kpi.publishedVideoCount ?? "Unknown"
                        )}
                    </Col>

                    <Col {...colArgs}>
                        Total Videos:&nbsp;
                        {mainGroupId ? (
                            <ProtectedLink
                                feature="Social"
                                to={VIDEO_MODERATION_LIST_URL.format({ stage }, { group: mainGroupId })}>
                                {kpi.totalVideoCount ?? "Unknown"}
                            </ProtectedLink>
                        ) : (
                            kpi.totalVideoCount ?? "Unknown"
                        )}
                    </Col>

                    <Col {...colArgs}>Video Likes: {kpi.videoLikesCount ?? "Unknown"}</Col>
                    <Col {...colArgs}>Tagged in Video: {kpi.taggedInVideoCount ?? "Unknown"}</Col>
                    <Col {...colArgs}>Soft Currency: {kpi.softCurrency ?? "Unknown"}</Col>
                    <Col {...colArgs}>Hard Currency: {kpi.hardCurrency ?? "Unknown"}</Col>
                    <Col {...colArgs}>XP Score: {kpi.xpScore ?? "Unknown"}</Col>
                    <Col {...colArgs}>Activity Score: {kpi.activityScore ?? "Unknown"}</Col>
                    <Col {...colArgs}>Creator Score: {creatorScore ?? "Unknown"}</Col>
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
