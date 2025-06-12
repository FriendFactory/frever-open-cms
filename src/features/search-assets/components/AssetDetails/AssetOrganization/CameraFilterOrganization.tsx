import React from "react";
import { Col, Form, Row, Select, Switch } from "antd";

import { CameraFilterAsset } from "features/search-assets/services";
import { CustomSelectRender } from "../CustomSelectRender";
import { CATEGORY_LIST_URL } from "urls";
import { createOptionsExtraBundle, ProtectedLink } from "shared";
import { PublicationFormFields } from "../PublicationFormFields";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";
import { ExtraDataBundleResult } from "shared/store";

export interface CameraFilterOrganizationProps {
    stage: string;
    data: CameraFilterAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function CameraFilterOrganization({ stage, data, bundleData }: CameraFilterOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Form.Item>Group ID: {data.groupId}</Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item
                    name="cameraFilterCategoryId"
                    label={
                        <ProtectedLink
                            feature="CategoriesFull"
                            to={CATEGORY_LIST_URL.format({ stage, category: "CameraFilterCategory" })}>
                            Camera Filter Category
                        </ProtectedLink>
                    }>
                    <Select
                        options={createOptionsExtraBundle("CameraFilterCategory", bundleData)}
                        dropdownRender={(menu) => (
                            <CustomSelectRender
                                menu={menu}
                                createFragment={<InlineCreateCategoryContainer category="CameraFilterCategory" />}
                            />
                        )}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="cameraFilterSubCategoryId" label="Camera Filter Sub Category">
                    <Select options={createOptionsExtraBundle("CameraFilterSubCategory", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="colorFilterCategoryId" label="Color Filter Category">
                    <Select options={createOptionsExtraBundle("ColorFilterCategory", bundleData)} />
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

            <PublicationFormFields />

            <Col xs={24} lg={12}>
                <Form.Item name="isStartPackMember" label="Start Pack Member" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
