import React from "react";
import { Button, Col, Form, FormProps, Input, Row, Select } from "antd";
import { CommonExtraDataType } from "shared";

interface WardrobeSearchFilterProps extends FormProps {
    wardrobeCollections?: CommonExtraDataType[];
}

export function WardrobeSearchFilter({ wardrobeCollections, ...formProps }: WardrobeSearchFilterProps) {
    return (
        <Form layout="horizontal" {...formProps}>
            <Row gutter={16}>
                <Col flex="220px">
                    <Form.Item name="search" label="Name">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="500px">
                    <Form.Item name="wardrobeCollectionId" label="Wardrobe Collection">
                        <Select
                            allowClear
                            mode="multiple"
                            options={wardrobeCollections?.map((el) => ({ label: el.name, value: el.id }))}
                            onSelect={formProps.onFinish}
                        />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
