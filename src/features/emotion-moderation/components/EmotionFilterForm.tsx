import React from "react";
import { Button, Col, Form, FormInstance, Input, Row, Select } from "antd";
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

import { ColAlignRight } from "shared/components/ColAlignRight";
import { EmotionsQueryParams } from "../services";
import { CreateEmotionContainer } from "../containers/CreateEmotionContainer";

const { Option } = Select;

export interface EmotionFilterFormProps {
    form: FormInstance<EmotionsQueryParams>;
    initialValues: EmotionsQueryParams;
    onSearch: () => void;
    onChangeSortDirection: () => void;
}

export function EmotionFilterForm({ form, initialValues, onSearch, onChangeSortDirection }: EmotionFilterFormProps) {
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
                    <CreateEmotionContainer />
                </Col>
            </Row>
        </Form>
    );
}
