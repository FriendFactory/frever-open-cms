import React from "react";
import { Form, Input, FormProps, Button, Row, Col, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { Video } from "features/video-moderation";
import { ChatConversationMessage } from "features/community-moderation/services/api";
import { SendMessageDropDownMedia } from "./SendMessageDropDownMedia";
import { SendMessageMediaPreview } from "./SendMessageMediaPreview";
import { SendMessageReply } from "./SendMessageReply";

export interface SendMessageFormData {
    text: string;
    imageFile?: File;
    video?: Video;
    replyMessage?: ChatConversationMessage;
}

interface SendMessageFormProps extends FormProps {}

export function SendMessageForm(props: SendMessageFormProps) {
    return (
        <Form {...props}>
            <Row gutter={16} wrap={false} align="bottom">
                <Col flex="1 0 auto">
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <SendMessageReply />

                        <Form.Item name="text" style={{ marginBottom: 0 }}>
                            <Input.TextArea
                                style={{ resize: "none" }}
                                autoSize={{ minRows: 2, maxRows: 4 }}
                                placeholder="Start typing message..."
                            />
                        </Form.Item>
                    </Space>
                </Col>

                <Form.Item name="replyMessage" noStyle>
                    <div></div>
                </Form.Item>
                <Form.Item name="imageFile" noStyle>
                    <div></div>
                </Form.Item>
                <Form.Item name="video" noStyle>
                    <div></div>
                </Form.Item>

                <Col>
                    <Space.Compact size="large">
                        <Form.Item shouldUpdate noStyle>
                            {({ getFieldsValue }) => {
                                const formData: SendMessageFormData = getFieldsValue();
                                const hasFormData = formData.imageFile || formData.video || formData.text;

                                return (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<SendOutlined />}
                                        disabled={!hasFormData}
                                    />
                                );
                            }}
                        </Form.Item>
                        <SendMessageDropDownMedia />
                    </Space.Compact>
                </Col>
            </Row>

            <SendMessageMediaPreview />
        </Form>
    );
}
