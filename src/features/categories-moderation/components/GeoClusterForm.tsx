import React from "react";
import { Col, Form, FormProps, Input, Row, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";

import { GeoCluster } from "../services";

const rules = [{ required: true }];

interface GeoClusterFormProps extends FormProps<Partial<GeoCluster>> {
    languagesOptions?: DefaultOptionType[];
    countriesOptions?: DefaultOptionType[];
}

export function GeoClusterForm({ languagesOptions, countriesOptions, ...props }: GeoClusterFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Form.Item name="title" label="Title" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="priority" label="Priority" rules={rules}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="recommendationVideosPool" label="Recommendation Videos Pool" rules={rules}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="recommendationNumOfDaysLookback"
                        label="Recommendation Number Of Days To Lookback"
                        rules={rules}>
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item name="includeVideoFromCountry" label="Include Video From Country">
                        <Select mode="multiple" options={countriesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="excludeVideoFromCountry" label="Exclude Video From Country">
                        <Select mode="multiple" options={countriesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="includeVideoWithLanguage" label="Include Video With Language">
                        <Select mode="multiple" options={languagesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="excludeVideoWithLanguage" label="Exclude Video With Language">
                        <Select mode="multiple" options={languagesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="showToUserFromCountry" label="Show To User From Country">
                        <Select mode="multiple" options={countriesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="hideForUserFromCountry" label="Hide For User From Country">
                        <Select mode="multiple" options={countriesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="showForUserWithLanguage" label="Show For User With Language">
                        <Select mode="multiple" options={languagesOptions} />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="hideForUserWithLanguage" label="Hide For User With Language">
                        <Select mode="multiple" options={languagesOptions} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
