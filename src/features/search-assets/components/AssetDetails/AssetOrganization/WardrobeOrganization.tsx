import React from "react";
import { Col, Form, Row, Select, Space, Switch, Tooltip, Typography } from "antd";

import { CATEGORY_LIST_URL, SEASON_DETAILS_PAGE_URL, USER_DETAILS_INFO_URL } from "urls";
import { ExtraDataBundleResult } from "shared/store";
import { CustomSelectRender } from "../CustomSelectRender";
import { PublicationFormFields } from "../PublicationFormFields";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";
import { createOptionsExtraBundle, ProtectedLink, selectAssetTierFilterProps, selectFilterProps } from "shared";
import { WardrobeBakingAvailabilityContainer } from "features/search-assets/containers/AssetDetails/WardrobeBakingView/WardrobeBakingAvailabilityContainer";
import { WardrobeBakingDisableReason } from "features/search-assets/services";

interface WardrobeOrganizationProps {
    stage: string;
    wardrobeId: number;
    availableForBaking: boolean;
    groupId?: number;
    seasonId?: number | null;
    wardrobeBakingDisableReason: WardrobeBakingDisableReason | null;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function WardrobeOrganization({
    stage,
    groupId,
    wardrobeId,
    availableForBaking,
    wardrobeBakingDisableReason,
    seasonId,
    bundleData
}: WardrobeOrganizationProps) {
    return (
        <Row gutter={24}>
            {groupId && (
                <Col xs={24} lg={12}>
                    <Form.Item>
                        Group ID:{" "}
                        <ProtectedLink
                            feature="Social"
                            to={USER_DETAILS_INFO_URL.format({ stage, selector: "mainGroupId", id: groupId })}>
                            {groupId}
                        </ProtectedLink>
                    </Form.Item>
                </Col>
            )}
            <Col xs={24} lg={12}>
                <Form.Item>
                    Available For Baking:{" "}
                    <Space>
                        <Typography.Text type={availableForBaking ? "success" : "danger"}>
                            {availableForBaking ? (
                                "Yes"
                            ) : (
                                <Tooltip title={`Reason: ${wardrobeBakingDisableReason?.reason ?? ""} `}>
                                    <Typography.Text type="danger" underline>
                                        No
                                    </Typography.Text>
                                </Tooltip>
                            )}
                        </Typography.Text>

                        <WardrobeBakingAvailabilityContainer
                            stage={stage}
                            wardrobeId={wardrobeId}
                            isAvailable={availableForBaking}
                        />
                    </Space>
                </Form.Item>
            </Col>
            {seasonId && (
                <Col span={24}>
                    <Form.Item>
                        Season ID:{" "}
                        <ProtectedLink feature="Seasons" to={SEASON_DETAILS_PAGE_URL.format({ stage, id: seasonId })}>
                            {seasonId}
                        </ProtectedLink>
                    </Form.Item>
                </Col>
            )}

            <Col xs={24} lg={12}>
                <Form.Item label="Gender" name="genderId">
                    <Select options={createOptionsExtraBundle("Gender", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="genderLeaningId" label="Gender Leaning">
                    <Select allowClear options={createOptionsExtraBundle("Gender", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item label="Wardrobe Collection" name="wardrobeCollectionId">
                    <Select allowClear options={createOptionsExtraBundle("WardrobeCollection", bundleData)} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item label="Brand" name="brandId">
                    <Select allowClear options={createOptionsExtraBundle("Brand", bundleData)} />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item label="Fit" name="wardrobeFitId">
                    <Select allowClear options={createOptionsExtraBundle("WardrobeFit", bundleData)} />
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
                <Form.Item
                    name="wardrobeCategoryId"
                    label={
                        <ProtectedLink
                            feature="CategoriesFull"
                            to={CATEGORY_LIST_URL.format({ stage, category: "WardrobeCategory" })}>
                            Wardrobe Category
                        </ProtectedLink>
                    }>
                    <Select
                        options={createOptionsExtraBundle("WardrobeCategory", bundleData)}
                        dropdownRender={(menu) => (
                            <CustomSelectRender
                                menu={menu}
                                createFragment={<InlineCreateCategoryContainer category="WardrobeCategory" />}
                            />
                        )}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item shouldUpdate noStyle>
                    {({ getFieldValue }) => {
                        const categoryId = getFieldValue("wardrobeCategoryId");
                        return (
                            <Form.Item
                                name="wardrobeAndWardrobeSubCategory"
                                label={
                                    <ProtectedLink
                                        feature="CategoriesFull"
                                        to={CATEGORY_LIST_URL.format({ stage, category: "WardrobeSubCategory" })}>
                                        Wardrobe Sub Category
                                    </ProtectedLink>
                                }
                                required>
                                <Select
                                    dropdownRender={(menu) => (
                                        <CustomSelectRender
                                            menu={menu}
                                            createFragment={
                                                <InlineCreateCategoryContainer category="WardrobeSubCategory" />
                                            }
                                        />
                                    )}
                                    options={bundleData["WardrobeSubCategory"]?.data
                                        ?.filter((el) => el.wardrobeCategoryId === categoryId)
                                        .map((el) => ({ value: el.id, label: el.name }))}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item label="Patterns" name="wardrobePatternIds">
                    <Select
                        allowClear
                        mode="multiple"
                        maxTagCount="responsive"
                        options={createOptionsExtraBundle("WardrobePattern", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item label="Colors" name="wardrobeColorIds">
                    <Select
                        allowClear
                        mode="multiple"
                        maxTagCount="responsive"
                        options={createOptionsExtraBundle("WardrobeColor", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item label="Styles" name="wardrobeStyleIds">
                    <Select
                        allowClear
                        mode="multiple"
                        maxTagCount="responsive"
                        options={createOptionsExtraBundle("WardrobeStyle", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item label="Materials" name="wardrobeMaterialIds">
                    <Select
                        allowClear
                        mode="multiple"
                        maxTagCount="responsive"
                        options={createOptionsExtraBundle("WardrobeMaterial", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <PublicationFormFields />

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
                <Form.Item name="compatibleGenderIds" label="Compatible Genders">
                    <Select allowClear mode="multiple" options={createOptionsExtraBundle("Gender", bundleData)} />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item label="Overrides Upper Underwear" name="overridesUpperUnderwear" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item label="Overrides Lower Underwear" name="overridesLowerUnderwear" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item label="Is Start Pack Member" name="isStartPackMember" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
