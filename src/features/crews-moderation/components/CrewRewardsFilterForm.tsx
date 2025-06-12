import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export interface CrewRewardsFilterFormFields {
    id?: number;
    title?: string;
    requiredTrophyScore?: number;
    isEnabled?: "true" | "false";
}

export interface CrewRewardsFilterFormProps {
    form: FormInstance<CrewRewardsFilterFormFields>;
    value?: CrewRewardsFilterFormFields;
    onSearch: () => void;
}

export function CrewRewardsFilterForm({ form, value, onSearch }: CrewRewardsFilterFormProps) {
    return (
        <Form form={form} initialValues={value}>
            <Row gutter={24} justify="start">
                <Col flex="1 0 160px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 220px">
                    <Form.Item name="title" label="Title">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 220px">
                    <Form.Item name="requiredTrophyScore" label="Trophy Score">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="121px">
                    <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                        Search
                    </Button>
                </Col>
                <Col>
                    <Form.Item name="isEnabled" label="">
                        <Radio.Group onChange={onSearch} name="isEnabled">
                            <Radio.Button value={"true"}>Enabled</Radio.Button>
                            <Radio.Button value={"false"}>Disabled</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
