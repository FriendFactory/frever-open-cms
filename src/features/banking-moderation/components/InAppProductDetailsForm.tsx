import React, { useState } from "react";
import { Button, Col, Form, FormProps, Input, Radio, Row } from "antd";
import { Gutter } from "antd/es/grid/row";

import { AssetCardContainer, ImageFormField, SelectAssetDropdown } from "shared";
import { InAppProductDetails } from "features/banking-moderation/services";
import { AssetData } from "features/search-assets/services";

const gutter: [Gutter, Gutter] = [24, 24];

export const assetSelectMenuItems: { key: keyof AssetData; label: string }[] = [
    { key: "Wardrobe", label: "Wardrobe" },
    { key: "SetLocation", label: "Set Location" },
    { key: "CameraFilter", label: "Camera Filter" },
    { key: "VFX", label: "VFX" },
    { key: "VoiceFilter", label: "Voice Filter" },
    { key: "BodyAnimation", label: "Body Animation" }
];

export type InAppProductDetailsFormInitialValues = Partial<Omit<InAppProductDetails, "files" | "id">> & {
    thumbnail_256?: File;
    thumbnail_1024?: File;
};

export interface InAppProductDetailsFormProps extends FormProps {
    stage: string;
    initialValues?: InAppProductDetailsFormInitialValues;
}

export const InAppProductDetailsForm = ({ stage, ...formProps }: InAppProductDetailsFormProps) => {
    const [currentReward, setCurrentReward] = useState<string>("softCurrency");

    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={gutter}>
                <Col span={24}>
                    <ImageFormField pathname="thumbnail_256" btnText="Select small image" />
                </Col>
                <Col span={24}>
                    <ImageFormField pathname="thumbnail_1024" btnText="Select large image" />
                </Col>
                <Col span={24}>
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Unique Offer Group" name="uniqueOfferGroup">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item shouldUpdate noStyle>
                        <Form.Item label="Reward Type">
                            <Radio.Group defaultValue="softCurrency" onChange={(e) => setCurrentReward(e.target.value)}>
                                <Radio.Button value="softCurrency">Soft Currency</Radio.Button>
                                <Radio.Button value="hardCurrency">Hard Currency</Radio.Button>
                                <Radio.Button value="asset">Asset</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    {currentReward === "asset" ? (
                        <Form.Item shouldUpdate>
                            {({ setFieldValue, validateFields, getFieldValue }) => {
                                const handleOnSelect = (assetId: number, assetType: string) => {
                                    setFieldValue("assetId", assetId);
                                    setFieldValue("assetType", assetType);
                                    validateFields(["assetId", "assetType"]);
                                };

                                const assetId = getFieldValue("assetId");
                                const assetType = getFieldValue("assetType");

                                return assetType && assetId ? (
                                    <>
                                        <Form.Item name="assetId" noStyle>
                                            <div></div>
                                        </Form.Item>
                                        <Form.Item name="assetType" noStyle>
                                            <div></div>
                                        </Form.Item>
                                        <AssetCardContainer
                                            stage={stage}
                                            assetType={assetType}
                                            assetId={assetId}
                                            width={260}
                                            markers={[
                                                <SelectAssetDropdown
                                                    stage={stage}
                                                    onSelect={handleOnSelect}
                                                    menuItems={assetSelectMenuItems}>
                                                    <a>Replace</a>
                                                </SelectAssetDropdown>
                                            ]}
                                        />
                                    </>
                                ) : (
                                    <SelectAssetDropdown
                                        stage={stage}
                                        menuItems={assetSelectMenuItems}
                                        onSelect={handleOnSelect}>
                                        <Button type="primary" ghost>
                                            Select
                                        </Button>
                                    </SelectAssetDropdown>
                                );
                            }}
                        </Form.Item>
                    ) : (
                        <Form.Item name={currentReward} label="Reward Value">
                            <Input type="number" />
                        </Form.Item>
                    )}
                </Col>
            </Row>
        </Form>
    );
};
