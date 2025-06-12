import React from "react";
import { Col, Form, Row, Select, Switch } from "antd";

import { CameraAnimationTemplateAsset } from "features/search-assets/services";
import { ExtraDataBundleResult } from "shared/store";
import { createOptionsExtraBundle } from "shared";

export interface CameraAnimTemplOrganizationProps {
    stage: string;
    data: CameraAnimationTemplateAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function CameraAnimTemplOrganization({ data, bundleData }: CameraAnimTemplOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>Size: {data.size}</Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item>Group ID: {data.groupId}</Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="cameraAnimationTypeId" label="Camera Animation Type">
                    <Select options={createOptionsExtraBundle("CameraAnimationType", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="cameraCategoryId" label="Camera Category">
                    <Select options={createOptionsExtraBundle("CameraCategory", bundleData)} />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="isDefault" label="Default" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
