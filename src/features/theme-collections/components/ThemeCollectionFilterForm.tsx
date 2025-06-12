import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row, Select } from "antd";
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";

import { ColAlignRight } from "shared/components/ColAlignRight";
import { ThemeCollectionsQueryParams } from "../services";
import { CreateThemeCollectionContainer } from "../containers/CreateThemeCollectionContainer";
import { useUniverseSearch } from "features/universe-moderation";
import { useCurrentStage } from "shared";

const { Option } = Select;

export interface ThemeCollectionFilterFormProps {
    form: FormInstance<ThemeCollectionsQueryParams>;
    initialValues: ThemeCollectionsQueryParams;
    onSearch: () => void;
    onChangeSortDirection: () => void;
}

export function ThemeCollectionFilterForm({
    form,
    initialValues,
    onSearch,
    onChangeSortDirection
}: ThemeCollectionFilterFormProps) {
    const stage = useCurrentStage();
    const universes = useUniverseSearch({ stage });
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

                <Col flex="200px">
                    <Form.Item name="universeId" label="Universe">
                        <Select
                            loading={universes?.info?.loading}
                            allowClear
                            options={universes?.info?.data?.map((el) => ({ label: el.name, value: el.id.toString() }))}
                            onChange={onSearch}
                        />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item name="isActive" label="Status">
                        <Radio.Group onChange={onSearch}>
                            <Radio.Button value={undefined}>All</Radio.Button>
                            <Radio.Button value="true">Active</Radio.Button>
                            <Radio.Button value="false">Inactive</Radio.Button>
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
                    <CreateThemeCollectionContainer />
                </Col>
            </Row>
        </Form>
    );
}
