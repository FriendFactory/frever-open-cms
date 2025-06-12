import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row, Select } from "antd";
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

import { ColAlignRight } from "shared/components/ColAlignRight";
import { VMEBackgroundQueryParams } from "../services";
import { CreateVMEBackgroundContainer } from "../containers/CreateVMEBackgroundContainer";

const { Option } = Select;

export interface VMEBackgroundFilterFormProps {
    form: FormInstance<VMEBackgroundQueryParams>;
    initialValues: VMEBackgroundQueryParams;
    onSearch: () => void;
    onChangeSortDirection: () => void;
}

export function VMEBackgroundFilterForm({
    form,
    initialValues,
    onSearch,
    onChangeSortDirection
}: VMEBackgroundFilterFormProps) {
    return (
        <Form form={form} initialValues={initialValues} onFinish={onSearch}>
            <Row gutter={24} justify="start">
                <Col flex="160px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col flex="220px">
                    <Form.Item name="name" label="Name">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item name="isEnabled">
                        <Radio.Group onChange={onSearch}>
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="true">Enabled</Radio.Button>
                            <Radio.Button value="false">Disabled</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col flex="121px">
                    <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                        Search
                    </Button>
                </Col>

                <ColAlignRight flex="300px">
                    <Row wrap={false} gutter={12} align="bottom">
                        <Col flex="auto">
                            <Form.Item label="Sort by" name="orderBy">
                                <Select onChange={onSearch}>
                                    <Option value="id">ID</Option>
                                    <Option value="name">Name</Option>
                                    <Option value="sortOrder">Sort Order</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button
                                    type="default"
                                    icon={
                                        initialValues.sortDirection === "desc" ? (
                                            <SortDescendingOutlined />
                                        ) : (
                                            <SortAscendingOutlined />
                                        )
                                    }
                                    onClick={onChangeSortDirection}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </ColAlignRight>

                <Col>
                    <CreateVMEBackgroundContainer />
                </Col>
            </Row>
        </Form>
    );
}
