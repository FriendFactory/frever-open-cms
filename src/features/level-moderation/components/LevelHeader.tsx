import React from "react";
import { Row, Typography } from "antd";
import dayjs from "dayjs";

import { PageHeader } from "shared";
import { Level } from "../services";

const { Text, Title } = Typography;

export interface LevelHeaderProps {
    id: number;
    level?: Level;
}

export function LevelHeader({ id, level }: LevelHeaderProps) {
    return (
        <PageHeader
            title={"Level: " + id}
            withBackButton
            extra={
                level?.isDeleted && (
                    <Title level={3} type="danger">
                        Deleted
                    </Title>
                )
            }>
            <Row justify="space-between">
                <Text type="secondary">
                    Created Time: {level && dayjs.utc(level?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                </Text>

                <Text type="secondary">
                    Modified Time: {level && dayjs.utc(level?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                </Text>
            </Row>
        </PageHeader>
    );
}
