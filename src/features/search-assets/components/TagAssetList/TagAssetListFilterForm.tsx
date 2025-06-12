import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { Assets } from "config";
import { TagAssetListFilterParams } from "features/search-assets/containers/TagAssetList/TagAssetListFilterFormContainer";

const { Option } = Select;

export interface TagFilterFormProps {
    values: TagAssetListFilterParams;
    handleOnChange: (data: TagAssetListFilterParams) => void;
}

export function TagAssetListFilterForm({ values, handleOnChange }: TagFilterFormProps) {
    const handleChangeAssetType = (assetType: string[]) => handleOnChange({ ...values, assetType });

    return (
        <Form initialValues={values} onFinish={handleOnChange} layout="horizontal">
            <Row gutter={24}>
                <Col flex="1 0 640px">
                    <Row gutter={8}>
                        <Col flex="1 0 200px">
                            <Form.Item name="searchFilter">
                                <Select>
                                    <Option value="contains">Contains</Option>
                                    <Option value="eq">Equals</Option>
                                    <Option value="startswith">Starts with</Option>
                                    <Option value="endswith">Ends with</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 290px">
                            <Form.Item name="search">
                                <Input name="search" placeholder="Input ID or Name" />
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

                <Col flex="1 0 200x">
                    <Form.Item name="assetType" label="Asset Type">
                        <Select
                            style={{ width: 250 }}
                            mode="multiple"
                            maxTagCount="responsive"
                            allowClear
                            options={Object.keys(Assets)
                                .filter((asset) => asset !== "CameraAnimationTemplate")
                                .map((key) => ({ value: key, label: key }))}
                            onChange={handleChangeAssetType}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
