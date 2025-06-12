import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";

import { availableLanguages, ISOCodes, LocalizationQueryParams } from "../services";

export interface LocalizationFilterFormProps {
    value: LocalizationQueryParams;
    onChange: (newValues: LocalizationQueryParams) => void;
}

export function LocalizationFilterForm({ value, onChange }: LocalizationFilterFormProps) {
    return (
        <Form initialValues={value} onFinish={onChange} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="250px">
                    <Form.Item name="key" label="Key">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="410px">
                    <Row gutter={8}>
                        <Col flex="170px">
                            <Form.Item name="isoCode" label="Value">
                                <Select
                                    allowClear
                                    options={Object.keys(availableLanguages).map((key) => ({
                                        label: availableLanguages[key as ISOCodes],
                                        value: key
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="220px">
                            <Form.Item name="value">
                                <Input placeholder="Input keywords here" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
