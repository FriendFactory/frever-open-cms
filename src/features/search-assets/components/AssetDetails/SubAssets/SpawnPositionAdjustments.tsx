import React from "react";
import { Button, Card, Col, Collapse, Divider, Form, InputNumber, Row, Select, Space } from "antd";

import { Adjustments } from "features/search-assets/services";
import { createOptionsExtraBundle, VectorFormItems } from "shared";
import { ExtraDataBundleResult } from "shared/store";

const rules = [{ required: true }];

enum EnumAdjustments {
    SCALE_MIN = 0.5,
    SCALE_MAX = 1.1,
    ADJUST_MIN = -2.0,
    ADJUST_MAX = 2.0
}

export interface SpawnPositionAdjustmentsProps {
    loading: boolean;
    data: Adjustments;
    bundleData: ExtraDataBundleResult["bundle"];
    editRequest: (data: Adjustments) => void;
}

export function SpawnPositionAdjustments({ loading, data, bundleData, editRequest }: SpawnPositionAdjustmentsProps) {
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
                                            <Col xs={24} md={12}>
                                                <Form.Item label="Gender" name="genderIds" rules={rules}>
                                                    <Select
                                                        mode="multiple"
                                                        maxTagCount="responsive"
                                                        options={createOptionsExtraBundle("Gender", bundleData)}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item label="Scale" name="scale" rules={rules}>
                                                    <InputNumber
                                                        type="number"
                                                        step={0.1}
                                                        min={EnumAdjustments.SCALE_MIN}
                                                        max={EnumAdjustments.SCALE_MAX}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <VectorFormItems
                                                name={(vector) => `adjust${vector.toUpperCase()}`}
                                                extraFormItemProps={{ rules: rules }}
                                                extraInputProps={{
                                                    min: EnumAdjustments.ADJUST_MIN,
                                                    max: EnumAdjustments.ADJUST_MAX
                                                }}
                                            />

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
