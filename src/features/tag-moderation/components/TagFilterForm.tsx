import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { TagFilterParams } from "features/tag-moderation/containers/TagFilterFormContainer";
import { CommonExtraDataType } from "shared";

export interface TagFilterFormProps {
    values: TagFilterParams;
    categories: CommonExtraDataType[];
    handleOnChange: (data: TagFilterParams) => void;
}

export function TagFilterForm({ values, categories, handleOnChange }: TagFilterFormProps) {
    return (
        <Form initialValues={values} onFinish={handleOnChange} layout="horizontal">
            <Row gutter={24}>
                <Col flex="1 0 200px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 300px">
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 300px">
                    <Form.Item name="categoryId" label="Category">
                        <Select
                            allowClear
                            options={categories.map((category) => ({ label: category.name, value: category.id }))}
                        />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button type="primary" ghost icon={<SearchOutlined />} htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
