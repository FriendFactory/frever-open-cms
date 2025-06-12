import React from "react";
import { Button, Card, Col, Collapse, Form, Input, Row, Select } from "antd";

import { UmaBundle } from "features/search-assets/services";
import { AssetTypes } from "config";
import { CommonExtraDataType, ProtectedLink } from "shared";
import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { AssetFormData } from "shared/services/api";

export interface UmaBundleProps {
    stage: string;
    loading: boolean;
    data: UmaBundle;
    readinessList: CommonExtraDataType[];
    editRequest: (asset: AssetTypes, data: AssetFormData) => void;
}

export function UmaBundle({ stage, loading, data, readinessList, editRequest }: UmaBundleProps) {
    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: data.id,
                    label: `UmaBundle (${data.assetBundleName})`,
                    extra: (
                        <ProtectedLink feature="AssetFull" to={UMA_BUNDLE_DETAILS_URL.format({ stage, id: data.id })}>
                            Open Uma Bundle
                        </ProtectedLink>
                    ),
                    children: (
                        <Card title="Information">
                            <Form
                                initialValues={data}
                                layout="horizontal"
                                disabled={loading}
                                onFinish={(values) => {
                                    editRequest("UmaBundle" as AssetTypes, { id: data.id, ...values });
                                }}>
                                <Row gutter={24}>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="Readiness" name="readinessId">
                                            <Select
                                                disabled={loading}
                                                options={readinessList.map((el) => ({ label: el.name, value: el.id }))}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item label="Size Kb" name="sizeKb">
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Button type="primary" htmlType="submit">
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    )
                }
            ]}
        />
    );
}
