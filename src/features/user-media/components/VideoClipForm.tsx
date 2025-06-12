import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";

import { useExtraData } from "shared/hooks/useExtraData";
import { FixedPageHeader } from "shared";
import { VideoClip } from "../services";

export interface VideoClipFormProps {
    stage: string;
    data?: VideoClip;
    loading: boolean;
    handleOnSubmit: (data: Object) => void;
}

export function VideoClipForm({ stage, data, loading, handleOnSubmit }: VideoClipFormProps) {
    const readinessList = useExtraData({ stage, name: "Readiness" });

    const [saveTitleStatus, setSaveTitleStatus] = useState(false);
    const showSaveTitle = () => setSaveTitleStatus(true);
    const hideSaveTitle = () => setSaveTitleStatus(false);

    const handleOnFinish = (data: Object) => {
        hideSaveTitle();
        handleOnSubmit(data);
    };

    return (
        <Card title="Information" loading={(loading && !data) || readinessList.loading}>
            {data && (
                <Form
                    layout="vertical"
                    onFinish={handleOnFinish}
                    onFieldsChange={showSaveTitle}
                    onReset={hideSaveTitle}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>Group ID: {data.groupId}</Col>

                        <Col xs={24} md={12}>
                            <Form.Item label="Readiness" name="readinessId">
                                <Select disabled={loading} key={data.readinessId} defaultValue={data.readinessId}>
                                    {readinessList.data?.map((el) => (
                                        <Select.Option key={el.id} value={el.id}>
                                            {el.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item label="Sort Order" name="sortOrder">
                                <Input
                                    type="number"
                                    disabled={loading}
                                    key={data.size}
                                    defaultValue={data.sortOrder ?? ""}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item label="Resolution Height" name="resolutionHeight">
                                <Input
                                    type="number"
                                    disabled={loading}
                                    key={data.resolutionHeight}
                                    defaultValue={data.resolutionHeight}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item label="Resolution Width" name="resolutionWidth">
                                <Input
                                    type="number"
                                    disabled={loading}
                                    key={data.resolutionWidth}
                                    defaultValue={data.resolutionWidth}
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

                        <Col xs={24} md={12}>
                            <Form.Item label="Frame Rate" name="frameRate">
                                <Input
                                    type="number"
                                    disabled={loading}
                                    key={data.size}
                                    defaultValue={data.frameRate ?? ""}
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
