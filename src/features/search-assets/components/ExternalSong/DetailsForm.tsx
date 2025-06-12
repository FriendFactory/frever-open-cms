import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";

import { ExternalSong } from "features/search-assets/services";
import { FixedPageHeader } from "shared";

export interface DetailsFormProps {
    data?: ExternalSong;
    loading: boolean;
    handleOnSubmit: (form: Partial<ExternalSong>) => void;
}

export function DetailsForm({ data, loading, handleOnSubmit }: DetailsFormProps) {
    const [isSaveTitleVisible, setSaveTitleVisible] = useState(false);
    return (
        <Card>
            {data && (
                <Form
                    initialValues={data}
                    onFieldsChange={() => setSaveTitleVisible(true)}
                    onReset={() => setSaveTitleVisible(false)}
                    onFinish={(e) => {
                        handleOnSubmit(e);
                        setSaveTitleVisible(false);
                    }}
                    layout="vertical"
                    disabled={loading}>
                    <Row gutter={24}>
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item name="songName" label="Song Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item name="artistName" label="Artist Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item name="sortOrder" label="Sort Order">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item name="challengeSortOrder" label="Challenge Sort Order">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item name="externalTrackId" label="External Track ID">
                                <Input />
                            </Form.Item>
                        </Col>

                        {isSaveTitleVisible && (
                            <FixedPageHeader
                                title="Unsaved changes"
                                extra={[
                                    <Button htmlType="reset">Cancel</Button>,
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
