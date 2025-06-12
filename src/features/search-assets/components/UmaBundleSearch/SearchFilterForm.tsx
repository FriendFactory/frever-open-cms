import React from "react";
import { Button, Row, Col, Form, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;
export interface VersionBunbleValues {
    id?: number;
    name?: string;
    searchFilter?: "contains" | "eq" | "startswith" | "endswith";
}

export interface SearchFilterFormProps {
    values: VersionBunbleValues;
    handleChange: (form: VersionBunbleValues) => void;
}

export function SearchFilterForm({ values, handleChange }: SearchFilterFormProps) {
    return (
        <Form layout="horizontal" initialValues={values} onFinish={handleChange}>
            <Row gutter={24} justify="start">
                <Col flex="1 0 150px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 500px">
                    <Row gutter={8}>
                        <Col flex="1 0 180px">
                            <Form.Item name="searchFilter" label="Name">
                                <Select>
                                    <Option value="contains">Contains</Option>
                                    <Option value="eq">Equals</Option>
                                    <Option value="startswith">Starts with</Option>
                                    <Option value="endswith">Ends with</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 250px">
                            <Form.Item name="name">
                                <Input name="name" placeholder="Search Name" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    <Form.Item>
                        <Button type="primary" ghost icon={<SearchOutlined />} htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
