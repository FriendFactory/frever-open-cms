import React from "react";
import { Divider, Form, FormInstance, Typography } from "antd";

import { ProtectedLink, useCurrentStage } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { BodyAnimationModalContainer } from "../containers/BodyAnimationModalContainer";

export function BodyAnimationFormItem({ getFieldValue, setFieldValue, validateFields }: FormInstance<any>) {
    const stage = useCurrentStage();
    const value: number | undefined = getFieldValue("defaultBodyAnimationId");

    const handleClick = (value: number | null) => {
        setFieldValue("defaultBodyAnimationId", value);
        validateFields(["defaultBodyAnimationId"]);
    };

    return (
        <Form.Item label="Default Body Animation" name="defaultBodyAnimationId" rules={[{ required: false }]}>
            {value ? (
                <>
                    <ProtectedLink
                        target="_blank"
                        feature="AssetFull"
                        to={DETAILS_ASSET_URL.format({
                            stage,
                            asset: "BodyAnimation",
                            id: value
                        })}>
                        ID: {value}
                    </ProtectedLink>
                    <Divider type="vertical" />
                    <BodyAnimationModalContainer
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
                <BodyAnimationModalContainer
                    stage={stage}
                    btnText="Select"
                    onClick={(asset) => handleClick(asset.id)}
                />
            )}
        </Form.Item>
    );
}
