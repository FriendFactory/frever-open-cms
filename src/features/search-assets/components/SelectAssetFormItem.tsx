import React from "react";
import { Divider, Form, FormInstance, FormItemProps, Typography } from "antd";
import { Rule } from "antd/es/form";

import { AssetSearchModalContainer, ProtectedLink, useCurrentStage } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { AssetTypes } from "config";

interface SelectAssetFormItemProps extends FormInstance<any> {
    asset: AssetTypes;
    fieldName: FormItemProps["name"];
    label: string;
    rules?: Rule[];
}

export function SelectAssetFormItem({
    asset,
    fieldName,
    label,
    rules,
    getFieldValue,
    setFieldValue,
    validateFields
}: SelectAssetFormItemProps) {
    const stage = useCurrentStage();
    const value: number | undefined = getFieldValue(fieldName);

    const handleClick = (value: number | null) => {
        setFieldValue(fieldName, value);
        validateFields([fieldName]);
    };

    return (
        <Form.Item label={label} name={fieldName} rules={rules}>
            {value ? (
                <>
                    <ProtectedLink
                        target="_blank"
                        feature="AssetFull"
                        to={DETAILS_ASSET_URL.format({
                            stage,
                            asset,
                            id: value
                        })}>
                        ID: {value}
                    </ProtectedLink>
                    <Divider type="vertical" />
                    <AssetSearchModalContainer
                        asset={asset}
                        stage={stage}
                        btnText="Replace"
                        onClick={(asset) => handleClick(asset.id)}
                    />
                    <Divider type="vertical" />
                    <Typography.Link type="danger" onClick={() => handleClick(null)}>
                        Remove
                    </Typography.Link>
                </>
            ) : (
                <AssetSearchModalContainer
                    asset={asset}
                    stage={stage}
                    btnText="Select"
                    onClick={(asset) => handleClick(asset.id)}
                />
            )}
        </Form.Item>
    );
}
