import React from "react";
import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { IntellectualPropertyQueryParams } from "../services";

export interface IntellectualPropertyFilterFormProps {
    form: FormInstance<IntellectualPropertyQueryParams>;
    values: IntellectualPropertyQueryParams;
    onSearch: () => void;
}

export function IntellectualPropertyFilterForm({ form, values, onSearch }: IntellectualPropertyFilterFormProps) {
    return (
        <Form form={form} initialValues={values} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="180px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="250px">
                    <Form.Item name="name" label="Name">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
