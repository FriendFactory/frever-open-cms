import React from "react";
import { Button, Card, Col, Collapse, Form, Input, Row } from "antd";

import { LightSettings } from "features/search-assets/services";
import { AssetFormData } from "shared/services/api";

export interface LightSettingsProps {
    loading: boolean;
    data: LightSettings;
    editRequest: (data: AssetFormData) => void;
}

export function LightSettings({ loading, data, editRequest }: LightSettingsProps) {
    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: data.id,
                    label: "Light Settings",
                    children: (
                        <Row gutter={24} justify="center">
                            <Col sm={24} lg={16}>
                                <Card title="Information">
                                    <Form
                                        disabled={loading}
                                        layout="horizontal"
                                        onFinish={editRequest}
                                        initialValues={{ id: data.id, color: data.color, intensity: data.intensity }}>
                                        <Form.Item hidden label="id" name="id">
                                            <Input key={data.id} name="id" />
                                        </Form.Item>
                                        <Form.Item label="Color" name="color">
                                            <Input key={data.color} name="color" />
                                        </Form.Item>
                                        <Form.Item label="Intensity" name="intensity">
                                            <Input key={data.intensity} name="intensity" />
                                        </Form.Item>

                                        <Button htmlType="submit">Save</Button>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            ]}
        />
    );
}
