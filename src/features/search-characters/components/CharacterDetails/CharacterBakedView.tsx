import React from "react";
import { Card, Col, Empty, Row, Typography } from "antd";

import { Character } from "features/user-moderation/services";
import { CharacterBakedView } from "features/search-characters/services";
import dayjs from "dayjs";
import { ReadinessTag } from "shared/components/ReadinessTag";

const colArgs = { xs: 24, md: 12, xxl: 8 };

export interface CharacterBakedViewProps {
    stage: string;
    loading: boolean;
    character?: Character;
    bakedView?: CharacterBakedView;
}

export function CharacterBakedView({ stage, loading, character, bakedView }: CharacterBakedViewProps) {
    return (
        <Card title="Baked View" loading={loading}>
            {bakedView ? (
                <Row gutter={[16, 16]} justify="start">
                    <Col {...colArgs}>ID: {bakedView.id}</Col>
                    <Col {...colArgs}>
                        Is Valid:{" "}
                        <Typography.Text type={bakedView.isValid ? "success" : "danger"}>
                            {bakedView.isValid ? "Yes" : "No"}
                        </Typography.Text>
                    </Col>
                    <Col {...colArgs}>
                        Readiness: <ReadinessTag stage={stage} readinessId={bakedView.readinessId} />
                    </Col>
                    <Col {...colArgs}>Character ID: {bakedView.characterId}</Col>

                    <Col {...colArgs}>Created Time: {dayjs(bakedView.createdTime).format("DD MMM YYYY HH:mm")}</Col>
                    <Col {...colArgs}>Modified Time: {dayjs(bakedView.modifiedTime).format("DD MMM YYYY HH:mm")}</Col>
                    <Col {...colArgs}>
                        Baked Time: {bakedTime(character?.availableForBakingSince, bakedView?.modifiedTime)}
                    </Col>
                    <Col span={24}>Character Version: {bakedView.characterVersion}</Col>
                </Row>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </Card>
    );
}

const bakedTime = (startDate?: string, endDate?: string): string => {
    if (!startDate || !endDate) return "Unknown";

    const diffInMilliseconds = dayjs(endDate).diff(dayjs(startDate));
    const processingTime = dayjs.duration(diffInMilliseconds);

    const days = processingTime.days();
    const hours = processingTime.hours();
    const minutes = processingTime.minutes();
    const seconds = processingTime.seconds();

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};
