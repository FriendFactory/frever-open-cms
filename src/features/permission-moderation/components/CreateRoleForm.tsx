import React from "react";
import { Col, Form, FormProps, Input, Row, Select } from "antd";
import { Gutter } from "antd/es/grid/row";
import { Rule } from "antd/es/form";

import { AdminAccessScope } from "../services";

const gutter: [Gutter, Gutter] = [24, 12];
const rules: Rule[] = [{ required: true }];

export interface CreateRoleFormProps extends FormProps {
    accessScopes: AdminAccessScope[];
}

export const CreateRoleForm = ({ accessScopes, ...fromProps }: CreateRoleFormProps) => {
    return (
        <Form layout="vertical" {...fromProps}>
            <Row gutter={gutter}>
                <Col span={24}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Access Scope" name="accessScopes" rules={rules}>
                        <Select
                            mode="multiple"
                            allowClear
                            options={accessScopes?.map((accessScope) => ({
                                label: accessScope.name,
                                value: accessScope.value
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
