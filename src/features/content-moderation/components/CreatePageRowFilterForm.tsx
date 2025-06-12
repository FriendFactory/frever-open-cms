import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { CreatePageContentQuery, CreatePageContentTypes, CreatePageRowQueryParams } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";

export interface CreatePageRowFilterFormProps {
    form: FormInstance<CreatePageRowQueryParams>;
    values: CreatePageRowQueryParams;
    onSearch: () => void;
}

export function CreatePageRowFilterForm({ form, values, onSearch }: CreatePageRowFilterFormProps) {
    return (
        <Form form={form} initialValues={values} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="180px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="250px">
                    <Form.Item name="title" label="Title">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col flex="220px">
                    <Form.Item name="contentType" label="Content Type">
                        <Select
                            allowClear
                            options={Object.entries(CreatePageContentTypes).map(([label, value]) => ({ label, value }))}
                            onChange={onSearch}
                        />
                    </Form.Item>
                </Col>

                <Col flex="300px">
                    <Form.Item name="contentQuery" label="Content Query">
                        <Select
                            allowClear
                            options={Object.entries(CreatePageContentQuery).map(([label, value]) => ({ label, value }))}
                            onChange={onSearch}
                        />
                    </Form.Item>
                </Col>

                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <ColAlignRight>
                    <Row gutter={[8, 16]}>
                        <Col>
                            <Form.Item name="isEnabled" label="Is Enabled">
                                <Radio.Group value={values?.isEnabled} onChange={onSearch}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
