import React from "react";
import { Card, Col, Form, Input, Row, Switch } from "antd";

import { DeleteButtonContainer } from "features/categories-moderation/containers/EditorSettings/DeleteButtonContainer";

export interface EditorSettingsFormProps {
    loading?: boolean;
    stage: string;
    id?: number;
}

export function EditorSettingsCard({ loading, stage, id, ...restProps }: EditorSettingsFormProps) {
    return (
        <Card
            {...restProps}
            loading={loading}
            title="Information"
            extra={
                id && (
                    <DeleteButtonContainer stage={stage} id={id} type="text" danger>
                        Delete
                    </DeleteButtonContainer>
                )
            }>
            <Row gutter={[24, 24]} justify="space-between">
                <Col xs={24} md={8}>
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item name="remix" label="Remix" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item name="levelCreation" label="Level Creation" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
}
