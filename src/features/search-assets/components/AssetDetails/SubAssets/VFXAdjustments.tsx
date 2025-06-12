import React from "react";
import { Button, Card, Col, Collapse, Divider, Form, InputNumber, Row, Select, Space } from "antd";

import { VfxAdjustments, VfxSpace } from "features/search-assets/services";
import { createOptionsExtraBundle, VectorFormItems } from "shared";
import { ExtraDataBundleResult } from "shared/store";

export interface VFXAdjustmentsProps {
    loading: boolean;
    data?: VfxAdjustments;
    bundleData: ExtraDataBundleResult["bundle"];
    editRequest: (data: VfxAdjustments) => void;
}

export function VFXAdjustments({ loading, data, bundleData, editRequest }: VFXAdjustmentsProps) {
    return (
        <Collapse
            bordered={false}
            items={[
                {
                    label: "Adjustments",
                    children: (
                        <Row gutter={24} justify="center">
                            <Col sm={24} lg={16}>
                                <Card title="Information">
                                    <Form
                                        disabled={loading}
                                        layout="vertical"
                                        onFinish={editRequest}
                                        initialValues={data}>
                                        <Row gutter={8}>
                                            <Col span={24}>
                                                <Form.Item label="Gender" name="genderIds">
                                                    <Select
                                                        maxTagCount="responsive"
                                                        mode="multiple"
                                                        options={createOptionsExtraBundle("Gender", bundleData)}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Divider orientation="left">Position</Divider>
                                            <VectorFormItems name={(vector) => ["adjustPosition", vector]} />

                                            <Divider orientation="left">Rotation</Divider>
                                            <VectorFormItems name={(vector) => ["adjustRotation", vector]} />

                                            <Divider orientation="left"></Divider>
                                            <Col xs={24} md={12}>
                                                <Form.Item label="Scale" name="scale">
                                                    <InputNumber type="number" step={0.1} style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item label="Space" name="space" rules={[{ required: true }]}>
                                                    <Select
                                                        options={VfxSpace.map((value, index) => ({
                                                            label: value,
                                                            value: index
                                                        }))}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Divider orientation="left">
                                                <Form.Item shouldUpdate noStyle>
                                                    {({ resetFields, isFieldsTouched }) => {
                                                        return (
                                                            <Space.Compact>
                                                                <Button htmlType="submit">Save</Button>
                                                                <Button
                                                                    htmlType="button"
                                                                    disabled={!isFieldsTouched()}
                                                                    onClick={() => resetFields()}>
                                                                    Reset
                                                                </Button>
                                                            </Space.Compact>
                                                        );
                                                    }}
                                                </Form.Item>
                                            </Divider>
                                        </Row>
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
