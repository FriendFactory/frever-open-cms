import React from "react";
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Select } from "antd";

import { ColAlignRight } from "shared/components/ColAlignRight";
import { AVAILABLE_LANGUAGES, ISOCodes, QuestGroupListQueryParams } from "../services";

export interface FilterFormProps {
    value: QuestGroupListQueryParams;
    onChange: (newValues: QuestGroupListQueryParams) => void;
}

export function QuestGroupFilterForm({ value, onChange }: FilterFormProps) {
    const handleChange = (event: RadioChangeEvent) => {
        const newValue: QuestGroupListQueryParams = { ...value, isEnabled: event.target.value };
        onChange(newValue);
    };

    return (
        <Form initialValues={value} onFinish={onChange} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="160px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col flex="410px">
                    <Row gutter={8}>
                        <Col flex="170px">
                            <Form.Item name="isoCode" label="Title">
                                <Select
                                    allowClear
                                    options={Object.keys(AVAILABLE_LANGUAGES).map((key) => ({
                                        label: AVAILABLE_LANGUAGES[key as ISOCodes],
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
                <ColAlignRight>
                    <Form.Item name="isEnabled" label="">
                        <Radio.Group onChange={handleChange}>
                            <Radio.Button value={"true"}>Enabled</Radio.Button>
                            <Radio.Button value={"false"}>Disabled</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
