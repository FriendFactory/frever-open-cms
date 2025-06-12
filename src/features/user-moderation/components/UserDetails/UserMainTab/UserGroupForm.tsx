import React, { useCallback, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";

import { FixedPageHeader } from "shared";
import { Group } from "features/user-moderation/services";

export interface UserGroupFormProps {
    loading: boolean;
    data: Group;
    handleOnSubmit: (data: Partial<Group>) => void;
}

export function UserGroupForm({ loading, data, handleOnSubmit }: UserGroupFormProps) {
    const [saveBtnStatus, setSaveBtnStatus] = useState(false);

    const showButtons = useCallback(() => setSaveBtnStatus(true), [saveBtnStatus]);

    const hideButtons = useCallback(() => setSaveBtnStatus(false), [saveBtnStatus]);

    return (
        <Form
            disabled={loading}
            layout="vertical"
            initialValues={data}
            onValuesChange={showButtons}
            onReset={hideButtons}
            onFinish={(data: Partial<Group>) => {
                hideButtons();
                handleOnSubmit(data);
            }}>
            <Row gutter={24} align="top">
                <Col sm={24} md={12}>
                    <Form.Item label="TopListPosition" name="toplistPosition">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Nickname" name="nickName">
                        <Input />
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
