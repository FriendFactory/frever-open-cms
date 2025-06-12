import React, { useEffect } from "react";
import { Col, Form, FormProps, Input, Row, Select, Switch } from "antd";
import { CreatePageContentQuery, CreatePageContentQueryMap, CreatePageContentTypes } from "../services";

const rules = [{ required: true }];

export interface CreatePageRowInfoFormProps extends FormProps {
    disableChangeContent?: boolean;
}

export function CreatePageRowInfoForm({
    disableChangeContent = false,
    form,
    ...formProps
}: CreatePageRowInfoFormProps) {
    const watchContentType: keyof typeof CreatePageContentQueryMap | undefined = Form.useWatch("contentType", form);

    useEffect(() => {
        if (!formProps.initialValues) form?.resetFields(["contentQuery"]);
    }, [watchContentType]);

    return (
        <Form layout="vertical" form={form} {...formProps}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item label="Title" name="title" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Content Type" name="contentType" rules={rules}>
                        <Select
                            disabled={disableChangeContent}
                            options={Object.entries(CreatePageContentTypes).map(([label, value]) => ({ label, value }))}
                        />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Content Query" name="contentQuery">
                        <Select
                            disabled={disableChangeContent}
                            allowClear
                            options={
                                watchContentType &&
                                CreatePageContentQueryMap[watchContentType].map((query) => ({
                                    label: query,
                                    value: CreatePageContentQuery[query]
                                }))
                            }
                        />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Test Group" name="testGroup">
                        <Input />
                    </Form.Item>
                </Col>

                <Col />

                <Col xs={24} md={12}>
                    <Form.Item label="Is Enabled" name="isEnabled" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
