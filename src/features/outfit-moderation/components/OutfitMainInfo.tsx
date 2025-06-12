import React from "react";
import { Card, Col, Empty, Row } from "antd";
import { Gutter } from "antd/es/grid/row";

import { Outfit } from "features/user-moderation/services";
import { ReadinessTag } from "shared/components/ReadinessTag";

const infoColArgs = { xs: 24, md: 12, lg: 8 };
const gutter: [Gutter, Gutter] = [16, 16];

export interface OutfitMainInfoProps {
    stage: string;
    loading: boolean;
    data?: Outfit;
}

export function OutfitMainInfo({ loading, data, stage }: OutfitMainInfoProps) {
    return (
        <Card title="Information" loading={loading}>
            {data ? (
                <Row gutter={gutter}>
                    <Col {...infoColArgs}>Outfit ID: {data.id ?? "Unknown"}</Col>
                    <Col {...infoColArgs}>Group ID: {data.groupId ?? "Unknown"}</Col>
                    <Col {...infoColArgs}>Sorted Order: {data.sortOrder ?? "Unknown"}</Col>
                    <Col {...infoColArgs}>
                        Readiness:{" "}
                        {data.readinessId ? <ReadinessTag stage={stage} readinessId={data.readinessId} /> : "Unknown"}
                    </Col>
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}
