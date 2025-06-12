import React from "react";
import { Col, Form, FormProps, Input, Row, Switch } from "antd";

import { InputEmoji } from "shared";

const rules = [{ required: true }];

export interface CreateEmotionFormProps extends FormProps {}

export function CreateEmotionForm(props: CreateEmotionFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="emojiCode" label="Emoji" rules={rules}>
                        <InputEmoji />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Is Enabled" name="isEnabled" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
