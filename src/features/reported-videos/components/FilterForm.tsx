import React from "react";
import { Button, Col, DatePicker, Form, Input, Radio, RadioChangeEvent, Row } from "antd";
import { Dayjs } from "dayjs";

import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;

export interface FilterFormFields {
    id?: string;
    videoId?: string;
    date?: [Dayjs, Dayjs];
    closed?: "true" | "false";
}

export interface FilterFormProps {
    value: FilterFormFields;
    onChange: (newValues: FilterFormFields) => void;
}

export function FilterForm({ value, onChange }: FilterFormProps) {
    const handleChange = (event: RadioChangeEvent) => {
        const newValue: FilterFormFields = { ...value, closed: event.target.value };
        onChange(newValue);
    };

    return (
        <Form initialValues={value} onFinish={onChange} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="1 0 160px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 220px">
                    <Form.Item name="videoId" label="Video ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="date" label="Date range">
                        <RangePicker style={{ width: "100%" }} allowEmpty={[true, true]} />
                    </Form.Item>
                </Col>
                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <ColAlignRight>
                    <Form.Item name="closed" label="">
                        <Radio.Group onChange={handleChange}>
                            <Radio.Button value={"true"}>Closed</Radio.Button>
                            <Radio.Button value={"false"}>Open</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
