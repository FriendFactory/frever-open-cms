import React, { useCallback } from "react";
import { Row, Col, Button, Input, Form } from "antd";
import { LootBoxQueryParams } from "../services";

export interface UserFilterProps {
    value: LootBoxQueryParams;
    onChange: (newValues: LootBoxQueryParams) => void;
}

export function LootBoxFilterForm({ value, onChange }: UserFilterProps) {
    const handleSubmit = useCallback(
        (newValues: LootBoxQueryParams) => {
            onChange(newValues);
        },
        [onChange, value]
    );

    return (
        <Form initialValues={value} onFinish={handleSubmit} layout="horizontal">
            <Row align="bottom" gutter={24}>
                <Col flex="1 0 220px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 230px">
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
