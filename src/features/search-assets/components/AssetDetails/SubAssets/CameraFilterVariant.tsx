import React from "react";
import { Button, Card, Col, Collapse, Form, Input, Row, Select } from "antd";

import { CameraFilterVariant } from "features/search-assets/services";
import { AssetTypes } from "config";
import { CommonExtraDataType } from "shared";
import { AssetFormData } from "shared/services/api";
import { AssetThumbnailContainer } from "features/search-assets/containers/AssetDetails";

const { Option } = Select;

export interface CameraFilterVariantProps {
    stage: string;
    loading: boolean;
    data: CameraFilterVariant;
    readinessList: CommonExtraDataType[];
    editRequest: (asset: AssetTypes, data: AssetFormData) => void;
}

export function CameraFilterVariant({ stage, loading, data, readinessList, editRequest }: CameraFilterVariantProps) {
    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: data.id,
                    label: `Camera Filter Variant "${data.name ?? ""}"`,
                    children: (
                        <Row gutter={24} justify="center">
                            <Col flex="1 1 500px">
                                <Card title="Information">
                                    <Form
                                        initialValues={data}
                                        disabled={loading}
                                        layout="horizontal"
                                        onFinish={(values) => {
                                            editRequest("CameraFilterVariant" as AssetTypes, {
                                                id: data.id,
                                                ...values
                                            });
                                        }}>
                                        <Form.Item label="Name" name="name">
                                            <Input />
                                        </Form.Item>

                                        <Form.Item label="Readiness" name="readinessId">
                                            <Select>
                                                {readinessList.map((el: { id: number; name: string }) => (
                                                    <Option key={el.id} value={el.id}>
                                                        {el.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Size Kb" name="sizeKb">
                                            <Input disabled />
                                        </Form.Item>

                                        <Button htmlType="submit">Save</Button>
                                    </Form>
                                </Card>
                            </Col>
                            {data.files && (
                                <Col flex="350px">
                                    <Card>
                                        <Row gutter={[0, 16]}>
                                            {data.files
                                                .filter((el) => el.file === 1)
                                                .map((file) => (
                                                    <Col key={file.resolution} span={24}>
                                                        <AssetThumbnailContainer
                                                            stage={stage}
                                                            id={data.id}
                                                            entityType="CameraFilterVariant"
                                                            file={file}
                                                        />
                                                    </Col>
                                                ))}
                                        </Row>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    )
                }
            ]}
        />
    );
}
