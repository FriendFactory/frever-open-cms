import React from "react";
import { Row, Typography } from "antd";

import { PageHeader } from "shared";

const { Text } = Typography;

export interface TemplateHeaderProps {
    id: number;
    title: string;
    createdTime: string;
    modifiedTime: string;
}

export function TemplateHeader({ id, title, createdTime, modifiedTime }: TemplateHeaderProps) {
    return (
        <PageHeader
            title={title}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {id}
                </Typography.Title>
            }>
            <Row justify="space-between">
                <Text type="secondary">Created Time: {createdTime}</Text>

                <Text type="secondary">Modified Time: {modifiedTime}</Text>
            </Row>
        </PageHeader>
    );
}
