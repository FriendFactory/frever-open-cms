import React from "react";
import { Col, Form, FormProps, Input, Row } from "antd";

const rules = [{ required: true }];

export interface AddDeviceToBlacklistFormProps extends FormProps {}

export const AddDeviceToBlacklistForm = (props: AddDeviceToBlacklistFormProps) => {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={12}>
                <Col span={24}>
                    <Form.Item label="Device ID" name="deviceId" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Reason" name="reason" rules={rules}>
                        <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
