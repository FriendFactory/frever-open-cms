import React from "react";
import { Col, Form, FormProps, Input, Row, Switch } from "antd";

import { SelectWithExtraDataOptions, useCurrentStage } from "shared";

const rules = [{ required: true }];

export interface UniverseInfoFormProps extends FormProps {}

export function UniverseInfoForm({ ...props }: UniverseInfoFormProps) {
    const stage = useCurrentStage();
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Readiness" name="readinessId">
                        <SelectWithExtraDataOptions stage={stage} name="Readiness" />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col />
                <Col sm={24} md={12}>
                    <Form.Item label="Is New" name="isNew" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Allow Start Gift" name="allowStartGift" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
