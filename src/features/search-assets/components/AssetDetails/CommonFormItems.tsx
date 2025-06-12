import React from "react";
import { Col, Form, Input, Row, Select } from "antd";

import { CommonExtraDataType } from "shared";

export interface CommonFormItemsProps {
    name: string;
    readinessList: CommonExtraDataType[];
}

export function CommonFormItems({ name, readinessList }: CommonFormItemsProps) {
    return (
        <Row gutter={24}>
            <Col xs={24} lg={12}>
                <Form.Item label="Name" name={name}>
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item label="Readiness" name="readinessId">
                    <Select options={readinessList.map((el) => ({ value: el.id, label: el.name }))} />
                </Form.Item>
            </Col>
        </Row>
    );
}
