import React from "react";
import { Button, Card, Col, Collapse, Form, Input, Row, Tooltip, Typography } from "antd";

import { SetLocationBundle } from "features/search-assets/services";
import { AssetInfoToUpdate } from "features/search-assets/store";

export interface SetLocationBundleProps {
    loading: boolean;
    data: SetLocationBundle;
    updateAssetInfo: (data: AssetInfoToUpdate) => void;
}

export function SetLocationBundle({ loading, data, updateAssetInfo }: SetLocationBundleProps) {
    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: data.id,
                    label: `SetLocation Bundle "${data.name ?? ""}"`,
                    extra: (
                        <span>
                            ID: <b>{data.id}</b>
                        </span>
                    ),
                    children: (
                        <Row gutter={24} justify="center">
                            <Col sm={24} lg={16}>
                                <Card title="Information">
                                    <Form
                                        initialValues={data}
                                        disabled={loading}
                                        layout="horizontal"
                                        onFinish={(values) => updateAssetInfo({ id: data.id, ...values })}>
                                        <Form.Item label="Name" name="name">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Size Kb" name="sizeKb">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Poly Count" name="polyCount">
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="UnityGUID" name="unityGuid">
                                            <Row gutter={[5, 0]}>
                                                <Col span={20}>
                                                    <Input disabled defaultValue={data.unityGuid} />
                                                </Col>
                                                <Col span={4}>
                                                    <Tooltip title={`Copy UnityGUID`}>
                                                        <Typography.Link
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(data.unityGuid)
                                                            }>
                                                            Copy
                                                        </Typography.Link>
                                                    </Tooltip>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                        <Button htmlType="submit">Save</Button>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            ]}
        />
    );
}
