import React from "react";
import { Col, Form, Input, Row, Select, Switch } from "antd";

import { SongAsset } from "features/search-assets/services";
import { CustomSelectRender } from "../CustomSelectRender";
import { CATEGORY_LIST_URL } from "urls";
import { createOptionsExtraBundle, ProtectedLink, selectFilterProps } from "shared";
import { PublicationFormFields } from "../PublicationFormFields";
import { InlineCreateCategoryContainer } from "features/categories-moderation/containers/InlineCreateCategoryContainer";
import { ExtraDataBundleResult } from "shared/store";

export interface SongOrganizationProps {
    stage: string;
    data: SongAsset;
    bundleData: ExtraDataBundleResult["bundle"];
}

export function SongOrganization({ stage, data, bundleData }: SongOrganizationProps) {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Form.Item>Group ID: {data.groupId ?? ""}</Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    name="artistId"
                    label={
                        <ProtectedLink
                            feature="CategoriesFull"
                            to={CATEGORY_LIST_URL.format({ stage, category: "Artist" })}>
                            Artist
                        </ProtectedLink>
                    }>
                    <Select
                        listHeight={160}
                        showSearch
                        dropdownRender={(menu) => (
                            <CustomSelectRender
                                menu={menu}
                                createFragment={<InlineCreateCategoryContainer category="Artist" />}
                            />
                        )}
                        options={createOptionsExtraBundle("Artist", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="labelId" label="Label">
                    <Select showSearch options={createOptionsExtraBundle("Label", bundleData)} {...selectFilterProps} />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    name="genreId"
                    label={
                        <ProtectedLink
                            feature="CategoriesFull"
                            to={CATEGORY_LIST_URL.format({ stage, category: "Genre" })}>
                            Genre
                        </ProtectedLink>
                    }>
                    <Select
                        showSearch
                        listHeight={160}
                        dropdownRender={(menu) => (
                            <CustomSelectRender
                                menu={menu}
                                createFragment={<InlineCreateCategoryContainer category="Genre" />}
                            />
                        )}
                        options={createOptionsExtraBundle("Genre", bundleData)}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item name="moodId" label="Mood" rules={[{ required: true, message: "This field is required" }]}>
                    <Select showSearch options={createOptionsExtraBundle("Mood", bundleData)} {...selectFilterProps} />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item name="externalPartnerId" label="External Partner">
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="samplingFrequency" label="Sampling Frequency">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="duration" label="Duration">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="samplingSize" label="Sampling Size">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="channels" label="Channels">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item name="size" label="Size">
                    <Input type="number" />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item name="emotions" label="Emotions">
                    <Select
                        allowClear
                        mode="multiple"
                        options={createOptionsExtraBundle("Emotion", bundleData, (extra) => ({
                            label: extra.name + " " + extra.emojiCode,
                            value: extra.id
                        }))}
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col />

            <PublicationFormFields />

            <Col xs={24} lg={12}>
                <Form.Item name="parentalExplicit" label="Parental Explicit" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    );
}
