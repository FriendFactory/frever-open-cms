import React from "react";
import { Col, Form, Input, Row, Select } from "antd";

import { SFXAsset } from "features/search-assets/services";
import { ExtraDataBundleResult } from "shared/store";
import { createOptionsExtraBundle } from "shared";

export interface SFXOrganizationProps {
    data: SFXAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function SFXOrganization({ data, bundleData }: SFXOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Form.Item>Group ID: {data.groupId ?? ""}</Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="sfxCategoryId" label="SFXCategory">
                    <Select options={createOptionsExtraBundle("SFXCategory", bundleData)} />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="samplingFrequency" label="Sampling Frequency">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="duration" label="Duration">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="samplingSize" label="Sampling Size">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="channels" label="Channels">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="size" label="Size">
                    <Input />
                </Form.Item>
            </Col>
        </Row>
    );
}
