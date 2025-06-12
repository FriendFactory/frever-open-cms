import React from "react";
import { Card, Col, Row } from "antd";

import { Video } from "features/video-moderation/services";

interface VideoDetailsStatisticsProps {
    kpi: Video["kpi"];
}

export const VideoDetailsStatistics = ({ kpi }: VideoDetailsStatisticsProps) => {
    return (
        <Card title="Statistics">
            <Row gutter={[24, 24]}>
                <Col xs={24} xl={12} xxl={8}>
                    Views: {kpi?.views ?? "Unknown"}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Likes: {kpi?.likes ?? "Unknown"}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Remixes: {kpi?.remixes ?? "Unknown"}
                </Col>
                <Col xs={24} xl={12} xxl={8}>
                    Comments: {kpi?.comments ?? "Unknown"}
                </Col>
            </Row>
        </Card>
    );
};
