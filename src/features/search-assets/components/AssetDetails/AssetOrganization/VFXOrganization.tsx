import React from "react";
import { Col, Form, Row, Select, Switch } from "antd";

import { VfxAnchorPoints, VFXAsset } from "features/search-assets/services";
import { CustomSelectRender } from "../CustomSelectRender";
import { CATEGORY_LIST_URL } from "urls";
import { createOptionsExtraBundle, ProtectedLink } from "shared";
import { PublicationFormFields } from "../PublicationFormFields";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";
import { ExtraDataBundleResult } from "shared/store";

export interface VFXOrganizationProps {
    stage: string;
    data: VFXAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function VFXOrganization({ stage, data, bundleData }: VFXOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>Size Kb: {data.sizeKb}</Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>Group ID: {data.groupId}</Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="vfxWorldSizeId" label="VFX World Size">
                    <Select options={createOptionsExtraBundle("VFXWorldSize", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="vfxDirectionId" label="VFX Direction">
                    <Select options={createOptionsExtraBundle("VFXDirection", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="vfxTypeId" label="VFX Type">
                    <Select options={createOptionsExtraBundle("VFXType", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    name="vfxCategoryId"
                    label={
                        <ProtectedLink
                            feature="CategoriesFull"
                            to={CATEGORY_LIST_URL.format({ stage, category: "VFXCategory" })}>
                            VFX Category
                        </ProtectedLink>
                    }>
                    <Select
                        options={createOptionsExtraBundle("VFXCategory", bundleData)}
                        dropdownRender={(menu) => (
                            <CustomSelectRender
                                menu={menu}
                                createFragment={<InlineCreateCategoryContainer category="VFXCategory" />}
                            />
                        )}
                    />
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
                <Form.Item name="assetTierId" label="Asset Tier">
                    <Select allowClear options={createOptionsExtraBundle("AssetTier", bundleData)} />
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

            <Col xs={24} lg={12}>
                <Form.Item name="anchorPoint" label="Anchor Point">
                    <Select
                        allowClear
                        options={VfxAnchorPoints.map((anchorPoint) => ({ label: anchorPoint, value: anchorPoint }))}
                    />
                </Form.Item>
            </Col>

            <PublicationFormFields />

            <Col xs={24} lg={12}>
                <Form.Item name="looping" label="Looping" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="isStartPackMember" label="Start Pack Member" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="followRotation" label="Follow Rotation" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
