import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { StoreValue } from "antd/lib/form/interface";

import { CommonExtraDataType, FixedPageHeader, Tag } from "shared";

export interface TagFormProps {
    data?: Tag;
    categories: CommonExtraDataType[];
    onFinish: (data: StoreValue) => void;
}

export function TagForm({ data, categories, onFinish }: TagFormProps) {
    const [saveBtnVisible, setSaveBtnVisible] = useState(false);

    const showSaveTitle = () => setSaveBtnVisible(true);

    const hideSaveTitle = () => setSaveBtnVisible(false);

    const handleOnFinish = (data: StoreValue) => {
        onFinish(data);
        hideSaveTitle();
    };

    return (
        <Form onFinish={handleOnFinish} layout="vertical" onFieldsChange={showSaveTitle} initialValues={data}>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Category" name="categoryId">
                        <Select
                            options={categories.map((category) => ({
                                value: category.id,
                                label: category.name
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>
            </Row>
            {saveBtnVisible && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={
                        <>
                            <Button htmlType="reset">Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </>
                    }
                />
            )}
        </Form>
    );
}
