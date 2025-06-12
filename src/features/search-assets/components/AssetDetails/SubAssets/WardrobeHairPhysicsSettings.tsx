import React from "react";
import { Button, Card, Col, Collapse, Divider, Form, Input, Row, Space } from "antd";
import styled from "styled-components";
import _ from "lodash";

import { WardrobePhysicsSettings } from "features/search-assets/services";
import { VectorFormItems } from "./VectorFormItems";
import { KeyframeFormItem } from "./WardrobeKeyframeFormItem";

export interface WardrobeHairPhysicsSettingsProps {
    loading: boolean;
    data: WardrobePhysicsSettings;
    editRequest: (data: WardrobePhysicsSettings) => void;
}

export function WardrobeHairPhysicsSettings({ loading, data, editRequest }: WardrobeHairPhysicsSettingsProps) {
    return (
        <Collapse
            bordered={false}
            items={[
                {
                    label: "Hair Physics Settings",
                    children: (
                        <Row gutter={24} justify="center">
                            <Col sm={24} lg={18}>
                                <Card title="Information">
                                    <FormStyled
                                        disabled={loading}
                                        layout="vertical"
                                        onFinish={editRequest}
                                        initialValues={data}>
                                        <Row gutter={8}>
                                            <Col xs={24} md={12}>
                                                <Form.Item label="Damping" name="damping">
                                                    <Input type="number" style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <KeyframeFormItem label="DampingDistrib" fieldName="dampingDistrib" />
                                            </Col>

                                            <Col xs={24} md={12}>
                                                <Form.Item label="Elasticity" name="elasticity">
                                                    <Input type="number" style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <KeyframeFormItem
                                                    label="ElasticityDistrib"
                                                    fieldName="elasticityDistrib"
                                                />
                                            </Col>

                                            <Col xs={24} md={12}>
                                                <Form.Item label="Stiffness" name="stiffness">
                                                    <Input type="number" style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <KeyframeFormItem
                                                    label="StiffnessDistrib"
                                                    fieldName="stiffnessDistrib"
                                                />
                                            </Col>

                                            <Col xs={24} md={12}>
                                                <Form.Item label="Inert" name="inert">
                                                    <Input type="number" style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <KeyframeFormItem label="InertDistrib" fieldName="inertDistrib" />
                                            </Col>

                                            <Col xs={24} md={12}>
                                                <Form.Item label="Radius" name="radius">
                                                    <Input type="number" style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <KeyframeFormItem label="RadiusDistrib" fieldName="radiusDistrib" />
                                            </Col>

                                            <VectorFormItems label="End Offset" fieldName="endOffset" />
                                            <VectorFormItems label="Gravity" fieldName="gravity" />
                                            <VectorFormItems label="Force" fieldName="force" />

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
                                    </FormStyled>
                                </Card>
                            </Col>
                        </Row>
                    )
                }
            ]}
        />
    );
}


const FormStyled = styled(Form<WardrobePhysicsSettings>)`
    .ant-col .ant-form-item-label{
        white-space: nowrap;
    }
`