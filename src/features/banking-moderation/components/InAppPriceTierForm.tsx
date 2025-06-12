import React from "react";
import { Form, FormProps, Input } from "antd";
import { PlayMarketProductRefLabel } from "./PlayMarketProductRefLabel";

export const InAppPriceTierForm = (formProps: FormProps) => {
    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>

            <Form.Item label="App Store Product Ref" name="appStoreProductRef">
                <Input />
            </Form.Item>

            <Form.Item label={<PlayMarketProductRefLabel />} name="playMarketProductRef">
                <Input />
            </Form.Item>

            <Form.Item label="Ref Price Usd Cents" name="refPriceUsdCents">
                <Input type="number" />
            </Form.Item>
        </Form>
    );
};
