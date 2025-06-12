import React, { useCallback, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";

import { FixedPageHeader } from "shared";
import { User } from "features/user-moderation/services";

const phonePattern = /^\+(?:[0-9]●?){6,14}[0-9]$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface FormValues {
    email: string | null;
    phoneNumber: string | null;
}

export interface UserFormProps {
    loading: boolean;
    data: User;
    handleSubmitUserChanges: (data: FormValues) => void;
}

export function UserForm({ loading, data, handleSubmitUserChanges }: UserFormProps) {
    const [saveBtnStatus, setSaveBtnStatus] = useState(false);

    const showButtons = useCallback(() => setSaveBtnStatus(true), [saveBtnStatus]);

    const hideButtons = useCallback(() => setSaveBtnStatus(false), [saveBtnStatus]);

    const handleInputForceLowerCase = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        if (!target) return;

        const { selectionStart, selectionEnd } = target;
        target.value = target.value.toLowerCase();
        target.setSelectionRange(selectionStart, selectionEnd);
    };

    return (
        <Form
            layout="vertical"
            onChange={showButtons}
            onReset={hideButtons}
            initialValues={data}
            onFinish={(data: FormValues) => {
                setSaveBtnStatus(false);
                handleSubmitUserChanges(data);
            }}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ pattern: emailPattern, message: "Email must be in the right format" }]}>
                        <Input key={data.email} disabled={loading} onInput={handleInputForceLowerCase} />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ pattern: phonePattern, message: "Phone must be in the right format" }]}>
                        <Input key={data.phoneNumber} disabled={loading} />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="AppleID/GoogleID">
                        <Input value={data.appleId ?? data.googleId ?? ""} disabled />
                    </Form.Item>
                </Col>
                {saveBtnStatus && (
                    <FixedPageHeader
                        title="Unsaved changes"
                        extra={[
                            <Button htmlType="reset">Discard</Button>,
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        ]}
                    />
                )}
            </Row>
        </Form>
    );
}
