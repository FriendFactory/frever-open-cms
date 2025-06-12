import React, { useCallback, useState } from "react";
import { Col, Row, Form, Switch, Input, Select, Button, Card, Empty } from "antd";

import { Character } from "features/user-moderation/services";
import { EditCharacterFormData } from "features/search-characters/services";
import { useExtraData } from "shared/hooks/useExtraData";
import { FixedPageHeader } from "shared";

export interface CharacterFormProps {
    stage: string;
    loading: boolean;
    data?: Character;
    onSubmit: (data: EditCharacterFormData) => void;
}

const colArgs = { xs: 24, md: 12, xxl: 8 };

export function CharacterForm({ stage, loading, data, onSubmit }: CharacterFormProps) {
    const readinessList = useExtraData({ stage, name: "Readiness" });

    const [saveBtnStatus, setSaveBtnStatus] = useState(false);

    const showSaveBtn = useCallback(() => setSaveBtnStatus(true), [saveBtnStatus]);

    const hideSaveBtn = useCallback(() => setSaveBtnStatus(false), [saveBtnStatus]);

    return (
        <Card title="Authority" loading={loading}>
            {data ? (
                <Form
                    layout="vertical"
                    initialValues={data}
                    onFinish={(data) => {
                        onSubmit(data);
                        hideSaveBtn();
                    }}
                    onReset={hideSaveBtn}
                    onChange={showSaveBtn}>
                    <Row gutter={24}>
                        <Col {...colArgs}>
                            <Form.Item label="Name" name="name">
                                <Input disabled={loading} />
                            </Form.Item>
                        </Col>
                        <Col {...colArgs}>
                            <Form.Item label="Readiness" name="readinessId">
                                <Select disabled={loading} loading={readinessList.loading} onChange={showSaveBtn}>
                                    {readinessList.data?.map((el) => (
                                        <Select.Option key={el.id} value={el.id}>
                                            {el.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col {...colArgs}>
                            <Form.Item label="Sort Order" name="sortOrder">
                                <Input disabled={loading} />
                            </Form.Item>
                        </Col>

                        <Col {...colArgs}>
                            <Form.Item label="Public For Creation" name="publicForCreation" valuePropName="checked">
                                <Switch disabled={loading} onChange={showSaveBtn} />
                            </Form.Item>
                        </Col>

                        <Col {...colArgs}>
                            <Form.Item
                                label="Public For Background Dancing"
                                name="publicForBackgroundDancing"
                                valuePropName="checked">
                                <Switch disabled={loading} onChange={showSaveBtn} />
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
            ) : (
                <Empty />
            )}
        </Card>
    );
}
