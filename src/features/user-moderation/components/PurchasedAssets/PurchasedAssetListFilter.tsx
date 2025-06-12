import React from "react";
import { Col, Form, Row, Select } from "antd";

import { PurchasedAssetsQueryParams, PurchasedAssetsTypes } from "features/user-moderation/services";

export interface PurchasedAssetListFilterProps {
    values: PurchasedAssetsQueryParams;
    handleOnChange: (data: PurchasedAssetsQueryParams) => void;
}

export function PurchasedAssetListFilter({ values, handleOnChange }: PurchasedAssetListFilterProps) {
    const handleChangeAssetType = (assetType: string[]) => handleOnChange({ ...values, assetType });

    return (
        <Form initialValues={values} onFinish={handleOnChange} layout="horizontal">
            <Row gutter={24}>
                <Col flex="1 0 200x">
                    <Form.Item name="assetType" label="Asset Type">
                        <Select
                            style={{ width: 250 }}
                            allowClear
                            options={Object.keys(PurchasedAssetsTypes).map((key) => ({
                                value: key,
                                label: PurchasedAssetsTypes[key as keyof typeof PurchasedAssetsTypes]
                            }))}
                            onChange={handleChangeAssetType}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
