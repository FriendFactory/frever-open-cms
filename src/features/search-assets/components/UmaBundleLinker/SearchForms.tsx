import React from "react";
import { Button, Row, Col, Form, Input } from "antd";

export interface BaseBunbleValues {
    baseBunId?: number;
    baseBunName?: string;
}

export interface VersionBunbleValues {
    versionBunId?: number;
    versionBunName?: string;
}

export interface SearchFormsProps {
    baseBunValues: BaseBunbleValues;
    versionBunValues: VersionBunbleValues;
    handleChangeBaseBunFilter: (form: BaseBunbleValues) => void;
    handleChangeVersionBunFilter: (form: VersionBunbleValues) => void;
}

export function SearchForms({
    baseBunValues,
    versionBunValues,
    handleChangeBaseBunFilter,
    handleChangeVersionBunFilter
}: SearchFormsProps) {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Form layout="horizontal" initialValues={baseBunValues} onFinish={handleChangeBaseBunFilter}>
                    <Row gutter={26} justify="start">
                        <Col flex="130px">
                            <Form.Item name="baseBunId" label="ID">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col flex="180px">
                            <Form.Item name="baseBunName" label="Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button ghost htmlType="submit" type="primary">
                                    Filter
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={12}>
                <Form layout="horizontal" initialValues={versionBunValues} onFinish={handleChangeVersionBunFilter}>
                    <Row gutter={26} justify="start">
                        <Col flex="130px">
                            <Form.Item name="versionBunId" label="ID">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col flex="180px">
                            <Form.Item name="versionBunName" label="Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button ghost htmlType="submit" type="primary">
                                    Filter
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}
