import React from "react";
import { Col, Form, FormProps, Input, Row, Select } from "antd";

import { SelectWithExtraDataOptions, useCurrentStage } from "shared";
import { IntellectualPropertyPageSelectorType } from "features/intellectual-property";

const rules = [{ required: true }];

export interface RaceInfoFormProps extends FormProps {
    intellectualProperty: IntellectualPropertyPageSelectorType;
}

export function RaceInfoForm({ intellectualProperty, ...formProps }: RaceInfoFormProps) {
    const stage = useCurrentStage();
    return (
        <Form layout="vertical" {...formProps}>
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
                    <Form.Item label="Prefab" name="prefab">
                        <Input />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Intellectual Property" name="intellectualPropertyId">
                        <Select
                            allowClear
                            loading={intellectualProperty.loading}
                            options={intellectualProperty.data?.map((entity) => ({
                                label: entity.name,
                                value: entity.id
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
