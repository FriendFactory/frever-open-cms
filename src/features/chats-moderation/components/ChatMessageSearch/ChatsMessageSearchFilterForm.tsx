import React from "react";
import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { ChatMessageSearchListQueryParams } from "features/chats-moderation";

export interface ChatsMessageSearchFilterFormProps {
    form: FormInstance<ChatMessageSearchListQueryParams>;
    initialValues: ChatMessageSearchListQueryParams;
    onSearch: () => void;
}

export const ChatsMessageSearchFilterForm = ({ form, initialValues, onSearch }: ChatsMessageSearchFilterFormProps) => (
    <Form form={form} initialValues={initialValues} onFinish={onSearch}>
        <Row gutter={24} justify="start">
            <Col flex="500px">
                <Form.Item name="messageText" label="Message">
                    <Input onPressEnter={onSearch} placeholder="Search messages..." />
                </Form.Item>
            </Col>

            <Col flex="121px">
                <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                    Search
                </Button>
            </Col>
        </Row>
    </Form>
);
