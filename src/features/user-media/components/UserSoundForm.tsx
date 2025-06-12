import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import { FixedPageHeader } from "shared";
import { UserSound } from "../services";
import { DeleteAssociatedVideosContainer } from "../containers/UserSoundDetails/DeleteAssociatedVideosContainer";

export interface UserSoundFormProps {
    stage: string;
    data?: UserSound;
    loading: boolean;
    handleOnSubmit: (data: Object) => void;
}

export function UserSoundForm({ data, loading, handleOnSubmit }: UserSoundFormProps) {
    const [saveTitleStatus, setSaveTitleStatus] = useState(false);

    const showSaveTitle = () => setSaveTitleStatus(true);

    const hideSaveTitle = () => setSaveTitleStatus(false);

    const handleOnFinish = (data: Object) => {
        hideSaveTitle();
        handleOnSubmit(data);
    };

    return (
        <Card
            title="Information"
            loading={loading && !data}
            extra={data && <DeleteAssociatedVideosContainer id={data.id} />}>
            {data && (
                <Form
                    layout="vertical"
                    onFinish={handleOnFinish}
                    onFieldsChange={showSaveTitle}
                    onReset={hideSaveTitle}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            Group ID: {data.groupId}
                        </Col>

                        <Col xs={24} md={12}>
                            Deleted:&nbsp;
                            <Typography.Text type={data.deletedAt ? "danger" : "success"}>
                                {data.deletedAt ? "Yes" : "No"}
                            </Typography.Text>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item label="Duration" name="duration">
                                <Input
                                    type="number"
                                    disabled={loading}
                                    key={data.size}
                                    defaultValue={data.duration ?? ""}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item label="Size" name="size">
                                <Input
                                    type="number"
                                    disabled={loading}
                                    key={data.size}
                                    defaultValue={data.size ?? ""}
                                />
                            </Form.Item>
                        </Col>

                        {saveTitleStatus && (
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
            )}
        </Card>
    );
}
