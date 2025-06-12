import React from "react";
import {
    Button,
    Col,
    ColProps,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Switch,
    Tooltip
} from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { createOptionsExtraBundle, useCurrentStage } from "shared";
import { CharacterSpawnPosition } from "features/search-assets/services";
import { BodyAnimationFormItem } from "../../BodyAnimationFormItem";
import { Link } from "react-router-dom";
import { SEARCH_ASSET_URL } from "urls";
import { ExtraDataBundleResult } from "shared/store";

export interface SpawnPositionInformationProps {
    unityGuid: string;
    colSize?: ColProps;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function SpawnPositionInformation({ colSize, unityGuid, bundleData }: SpawnPositionInformationProps) {
    const stage = useCurrentStage();
    return (
        <Row gutter={24}>
            <Col {...colSize}>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="Max Characters Amount" name="maxCharactersAmount">
                    <Input />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="Body Animation Space Size" name="bodyAnimationSpaceSizeId">
                    <Select options={createOptionsExtraBundle("BodyAnimationSpaceSize", bundleData)} />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="Movement Type" name="movementTypeId">
                    <Select options={createOptionsExtraBundle("MovementType", bundleData)} />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item shouldUpdate label="Spawn Position Group">
                    {({ getFieldValue }) => {
                        const value = getFieldValue("spawnPositionGroupId");

                        return value ? (
                            <Link
                                to={SEARCH_ASSET_URL.format(
                                    { stage, asset: "CharacterSpawnPosition" },
                                    { spawnPositionGroupId: value }
                                )}>
                                ID: {value}
                            </Link>
                        ) : (
                            "None"
                        );
                    }}
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item shouldUpdate noStyle>
                    {({ getFieldValue }) => {
                        const spawnPositionGroupId = getFieldValue("spawnPositionGroupId");

                        return (
                            <Form.Item name="spawnOrderIndex" label="Order Index In Group">
                                <InputNumber
                                    style={{ width: "100%" }}
                                    controls={false}
                                    disabled={!spawnPositionGroupId}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="Spawn Position Space Size" name="spawnPositionSpaceSizeId">
                    <Select options={createOptionsExtraBundle("SpawnPositionSpaceSize", bundleData)} />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item shouldUpdate noStyle>
                    {(props: FormInstance<CharacterSpawnPosition>) => <BodyAnimationFormItem {...props} />}
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="isDefault" name="isDefault" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="Available For Selection" name="availableForSelection" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>

            <Col {...colSize}>
                <Form.Item label="Moving" name="moving" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item label="UnityGuid">
                    <Space.Compact block>
                        <Form.Item style={{ width: "100%" }} name="unityGuid">
                            <Input disabled />
                        </Form.Item>

                        <Tooltip title="Copy UnityGUID">
                            <Button
                                onClick={() => navigator.clipboard.writeText(unityGuid)}
                                icon={<CopyOutlined />}></Button>
                        </Tooltip>
                    </Space.Compact>
                </Form.Item>
            </Col>
        </Row>
    );
}
