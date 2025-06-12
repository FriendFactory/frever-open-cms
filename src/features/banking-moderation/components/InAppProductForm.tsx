import React from "react";
import { Col, DatePicker, Form, FormProps, Input, Row, Select, Space, Switch, Typography } from "antd";
import { Gutter } from "antd/es/grid/row";
import { Dayjs } from "dayjs";

import { InAppProduct } from "features/banking-moderation/services";
import { useInAppPriceTiers } from "features/banking-moderation/hooks/useInAppPriceTiers";

import { PlayMarketProductRefLabel } from "./PlayMarketProductRefLabel";
import { ImageFormField, ImageResolution } from "shared";

const gutter: [Gutter, Gutter] = [24, 24];

export const imageSizes: Record<string, ImageResolution> = {
    "256x256": [1005, 498],
    "1024x1024": [1005, 1698]
};

export type InAppProductFormInitialValues = Partial<
    Omit<InAppProduct, "publicationDate" | "depublicationDate"> & {
        publicationDate: Dayjs | null;
        depublicationDate: Dayjs | null;
        thumbnail_256?: File;
        thumbnail_1024?: File;
    }
>;

export interface InAppProductFormProps extends FormProps {
    initialValues?: InAppProductFormInitialValues;
    stage: string;
    withThumbnailSelect?: boolean;
}

export const InAppProductForm = ({ stage, withThumbnailSelect, ...formProps }: InAppProductFormProps) => {
    const inAppPriceTiers = useInAppPriceTiers(stage);
    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={gutter}>
                {withThumbnailSelect && (
                    <Col span={24}>
                        <Space style={{ width: "100%" }} direction="vertical">
                            <Typography.Text>
                                Thumbnails&nbsp;
                                <Typography.Text type="secondary">
                                    (Please, do not forget about rounded corners with opacity and highlight)
                                </Typography.Text>
                            </Typography.Text>
                            <ImageFormField
                                pathname="thumbnail_256"
                                requiredResolution={imageSizes.small}
                                btnText="Select 1005x498 image"
                            />
                            <ImageFormField
                                pathname="thumbnail_1024"
                                requiredResolution={imageSizes.large}
                                btnText="Select 1005x1698 image"
                            />
                        </Space>
                    </Col>
                )}

                <Col span={24}>
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="App Store Product Ref" name="appStoreProductRef">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label={<PlayMarketProductRefLabel />} name="playMarketProductRef">
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Publication Date" name="publicationDate">
                        <DatePicker
                            style={{ width: "100%" }}
                            showTime={{ format: "HH:mm" }}
                            format="DD MMM YYYY HH:mm"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Depublication Date" name="depublicationDate">
                        <DatePicker
                            style={{ width: "100%" }}
                            showTime={{ format: "HH:mm" }}
                            format="DD MMM YYYY HH:mm"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Product Price Tier" name="inAppProductPriceTierId">
                        <Select
                            loading={inAppPriceTiers?.loading}
                            options={inAppPriceTiers.data?.map((item) => ({ label: item.title, value: item.id }))}
                        />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Active" name="isActive" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Season Pass" name="isSeasonPass" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
