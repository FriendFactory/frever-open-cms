import React from "react";
import { Col, Form, Row, Select, Switch, Input } from "antd";

import { SetLocationAsset } from "features/search-assets/services";
import { CustomSelectRender } from "../CustomSelectRender";
import { CATEGORY_LIST_URL } from "urls";
import { createOptionsExtraBundle, ProtectedLink, selectAssetTierFilterProps, selectFilterProps } from "shared";
import { PublicationFormFields } from "../PublicationFormFields";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";
import { ExtraDataBundleResult } from "shared/store";

export interface SetLocationOrganizationProps {
    stage: string;
    data: SetLocationAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function SetLocationOrganization({ stage, data, bundleData }: SetLocationOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Form.Item>Group ID: {data.groupId}</Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="setLocationTemplateId" label="SetLocation Template">
                    <Select options={createOptionsExtraBundle("SetLocationTemplate", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="weatherId" label="Weather">
                    <Select
                        showSearch
                        options={createOptionsExtraBundle("Weather", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="geoReferenceId" label="Geo Reference">
                    <Select
                        showSearch
                        options={createOptionsExtraBundle("GeoReference", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="vfxTypeId" label="VFX Type">
                    <Select
                        showSearch
                        options={createOptionsExtraBundle("VFXType", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item shouldUpdate noStyle>
                    {({ setFieldValue }) => {
                        const handleOnSelect = (categoryId: number) => {
                            const firstSubCategory = bundleData.SetLocationSubcategory?.data
                                ?.filter((val) => val.setLocationCategoryId === categoryId)
                                .map((el) => ({ value: el.id, label: el.name }))
                                .find(Boolean);

                            setFieldValue("setLocationSubCategoryId", firstSubCategory?.value);
                        };

                        return (
                            <Form.Item
                                name="setLocationCategoryId"
                                label={
                                    <ProtectedLink
                                        feature="CategoriesFull"
                                        to={CATEGORY_LIST_URL.format({ stage, category: "SetLocationCategory" })}>
                                        SetLocation Category
                                    </ProtectedLink>
                                }>
                                <Select
                                    showSearch
                                    listHeight={160}
                                    onSelect={handleOnSelect}
                                    options={createOptionsExtraBundle("SetLocationCategory", bundleData)}
                                    dropdownRender={(menu) => (
                                        <CustomSelectRender
                                            menu={menu}
                                            createFragment={
                                                <InlineCreateCategoryContainer category="SetLocationCategory" />
                                            }
                                        />
                                    )}
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
                        const categoryId = getFieldValue("setLocationCategoryId");
                        return (
                            <Form.Item name="setLocationSubCategoryId" label="SetLocation SubCategory">
                                <Select
                                    showSearch
                                    options={bundleData["SetLocationSubcategory"]?.data
                                        ?.filter((el) => el.setLocationCategoryId === categoryId)
                                        .map((el) => ({ value: el.id, label: el.name }))}
                                    {...selectFilterProps}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="setLocationMoodId" label="Set Location Mood">
                    <Select
                        showSearch
                        options={createOptionsExtraBundle("SetLocationMood", bundleData)}
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
                <Form.Item name="sortOrderByCategory" label="Sort Order">
                    <Input type="number" name="sortOrderByCategory" />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="sortOrderForVideoMessage" label="Sort Order Video Message">
                    <Input type="number" />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="recommendSortOrder" label="Recommend Sort Order">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}></Col>

            <Col xs={24} lg={12}>
                <Form.Item name="isStartPackMember" label="Start Pack Member" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    name="characterLocomotionAllowed"
                    label="Character Locomotion allowed"
                    valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="allowPhoto" label="Allow Photo" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="allowVideo" label="Allow Video" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="allowForVideoMessage" label="Allow Video Message" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="allowForNormalEditor" label="Allow Normal Editor" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="isExcludedFromLists" label="Excluded From Lists" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
