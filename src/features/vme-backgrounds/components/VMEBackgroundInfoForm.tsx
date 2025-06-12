import React from "react";
import { Col, Form, FormProps, Input, Row, Switch } from "antd";

const rules = [{ required: true }];

export interface VMEBackgroundInfoFormProps extends FormProps {}

export function VMEBackgroundInfoForm(props: VMEBackgroundInfoFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Is Enabled" name="isEnabled" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
