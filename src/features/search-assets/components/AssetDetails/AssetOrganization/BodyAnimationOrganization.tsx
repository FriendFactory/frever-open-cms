import React from "react";
import { Col, Form, InputNumber, Row, Select, Space, Switch, Tooltip, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { CustomSelectRender } from "../CustomSelectRender";
import { CATEGORY_LIST_URL } from "urls";
import { BodyAnimationAsset } from "features/search-assets/services";
import { createOptionsExtraBundle, ProtectedLink, selectAssetTierFilterProps, selectFilterProps } from "shared";
import { PublicationFormFields } from "../PublicationFormFields";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";
import { ExtraDataBundleResult } from "shared/store";

export interface BodyAnimationOrganizationProps {
    stage: string;
    data: BodyAnimationAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function BodyAnimationOrganization({ stage, data, bundleData }: BodyAnimationOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>FrameRate: {data.frameRate ?? "<Null>"}</Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>SizeKb: {data.sizeKb ?? "<Null>"}</Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    Duration: {data.duration ? dayjs.duration(data.duration).format("m:s") : "<Null>"}
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>Group ID: {data.groupId ?? "<Null>"}</Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="bodyAnimationSpaceSizeId" label="Body Animation Space Size">
                    <Select options={createOptionsExtraBundle("BodyAnimationSpaceSize", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    name="bodyAnimationCategoryId"
                    label={
                        <ProtectedLink
                            feature="CategoriesFull"
                            to={CATEGORY_LIST_URL.format({ stage, category: "BodyAnimationCategory" })}>
                            Body Animation Category
                        </ProtectedLink>
                    }>
                    <Select
                        listHeight={160}
                        dropdownRender={(menu) => (
                            <CustomSelectRender
                                menu={menu}
                                createFragment={<InlineCreateCategoryContainer category="BodyAnimationCategory" />}
                            />
                        )}
                        options={createOptionsExtraBundle("BodyAnimationCategory", bundleData)}
                        showSearch
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item shouldUpdate noStyle>
                    {({ getFieldValue, setFieldValue, setFields, validateFields }) => {
                        const orderIndexInGroup = getFieldValue("orderIndexInGroup");

                        const handleOrderIndexInGroup = (bodyAnimationGroupId: string | undefined) => {
                            if (!bodyAnimationGroupId && orderIndexInGroup) {
                                setFieldValue("orderIndexInGroup", undefined);
                                validateFields(["orderIndexInGroup"]);
                            } else if (!orderIndexInGroup) {
                                setFields([
                                    {
                                        name: "orderIndexInGroup",
                                        errors: ["This field is required for Body Animation Group"]
                                    }
                                ]);
                                validateFields(["orderIndexInGroup"]);
                            } else if (!bodyAnimationGroupId && !orderIndexInGroup) {
                                setFields([
                                    {
                                        name: "orderIndexInGroup",
                                        errors: [""]
                                    }
                                ]);
                                validateFields(["orderIndexInGroup"]);
                            }
                        };

                        return (
                            <Form.Item
                                name="bodyAnimationGroupId"
                                label={
                                    <ProtectedLink
                                        feature="CategoriesFull"
                                        to={CATEGORY_LIST_URL.format({ stage, category: "BodyAnimationGroup" })}>
                                        Body Animation Group
                                    </ProtectedLink>
                                }>
                                <Select
                                    listHeight={160}
                                    dropdownRender={(menu) => (
                                        <CustomSelectRender
                                            menu={menu}
                                            createFragment={
                                                <InlineCreateCategoryContainer category="BodyAnimationGroup" />
                                            }
                                        />
                                    )}
                                    onChange={handleOrderIndexInGroup}
                                    allowClear
                                    showSearch
                                    options={createOptionsExtraBundle("BodyAnimationGroup", bundleData)}
                                    {...selectFilterProps}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item shouldUpdate noStyle>
                    {({ getFieldValue }) => {
                        const bodyAnimationGroupId = getFieldValue("bodyAnimationGroupId");

                        return (
                            <Form.Item name="orderIndexInGroup" label="Order Index In Group">
                                <InputNumber
                                    style={{ width: "100%" }}
                                    controls={false}
                                    disabled={!bodyAnimationGroupId}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="animationDirectionId" label="Animation Direction">
                    <Select options={createOptionsExtraBundle("AnimationDirection", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="movementTypeId" label="Movement Type">
                    <Select
                        allowClear
                        showSearch
                        options={createOptionsExtraBundle("MovementType", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="requiredLevel" label="Required Level">
                    <Select
                        allowClear
                        showSearch
                        options={createOptionsExtraBundle("UserLevel", bundleData, (extra) => ({
                            label: extra.name,
                            value: extra.level
                        }))}
                        filterOption={(input, option) =>
                            ((option?.label as string).toLocaleLowerCase() ?? "").includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) => (optionA.value as number) - (optionB.value as number)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="assetTierId" label="Asset Tier">
                    <Select
                        allowClear
                        options={createOptionsExtraBundle("AssetTier", bundleData)}
                        {...selectAssetTierFilterProps}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="emotions" label="Emotions">
                    <Select
                        allowClear
                        mode="multiple"
                        options={createOptionsExtraBundle("Emotion", bundleData, (extra) => ({
                            label: extra.emojiCode + " " + extra.name,
                            value: extra.id
                        }))}
                        {...selectFilterProps}
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

            <PublicationFormFields />

            <Col xs={24} lg={12}>
                <Form.Item name="isStartPackMember" label="Is Start Pack Member" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="isDefault" label="Default" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="hasFaceAnimation" label="Has Face Animation" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="splittable" label="Splittable" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="continous" label="Continous" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="looping" label="Looping" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="locomotion" label="Locomotion" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    name="availableForBackground"
                    label={
                        <Space>
                            Available For Background
                            <Typography.Link>
                                <Tooltip title="This will be applied for background characters during dress up.">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </Typography.Link>
                        </Space>
                    }
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
