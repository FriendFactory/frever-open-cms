import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Switch } from "antd";

import { FixedPageHeader } from "shared";
import { OnboardingQuestGroup } from "../services";
import { LocalizationFormItems } from "./LocalizationFormItems";

export interface OnboardingInfoProps {
    data?: OnboardingQuestGroup;
    loading: boolean;
    handleOnSubmit: (form: Partial<OnboardingQuestGroup>) => void;
}

export function OnboardingInfo({ data, loading, handleOnSubmit }: OnboardingInfoProps) {
    const [isSaveTitleVisible, setSaveTitleVisible] = useState(false);
    return (
        <Card title="Information" loading={loading}>
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
                        <Col xs={24} md={12}>
                            <Form.Item name={["title", "eng"]} label="Title">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="ordinal" label="Ordinal">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name={["description", "eng"]} label="Description">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="isEnabled" label="Is Enabled" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <LocalizationFormItems fieldName="title" />
                        </Col>
                        <Col span={24}>
                            <LocalizationFormItems fieldName="description" />
                        </Col>
                    </Row>
                    {isSaveTitleVisible && (
                        <FixedPageHeader
                            title="Unsaved changes"
                            extra={
                                <>
                                    <Button htmlType="reset">Cancel</Button>
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                </>
                            }
                        />
                    )}
                </Form>
            )}
        </Card>
    );
}
