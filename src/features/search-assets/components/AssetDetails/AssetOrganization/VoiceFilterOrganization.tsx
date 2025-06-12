import React from "react";
import { Col, Form, Input, Row, Select } from "antd";

import { VoiceFilterAsset } from "features/search-assets/services";
import { ExtraDataBundleResult } from "shared/store";
import { createOptionsExtraBundle } from "shared";

export interface VoiceFilterOrganizationProps {
    stage: string;
    data: VoiceFilterAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function VoiceFilterOrganization({ data, bundleData }: VoiceFilterOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Form.Item>Group ID: {data.groupId ?? ""}</Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="displayName" label="Display Name">
                    <Input />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="voiceFilterCategoryId" label="Voice Filter Category">
                    <Select options={createOptionsExtraBundle("VoiceFilterCategory", bundleData)} />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="volume" label="Volume">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="effectParameters" label="Effect Parameters">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="pitch" label="Pitch">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="sendLevel" label="Send Level">
                    <Input />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="wetMixLevel" label="WetMixLevel">
                    <Input />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="requiredLevel" label="Required Level">
                    <Select
                        allowClear
                        options={createOptionsExtraBundle("UserLevel", bundleData, (extra) => ({
                            label: extra.name,
                            value: extra.level
                        }))}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="compatibleRaceIds" label="Compatible Races">
                    <Select
                        allowClear
                        mode="multiple"
                        options={createOptionsExtraBundle("Race/moderation", bundleData)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12} />
        </Row>
    );
}
