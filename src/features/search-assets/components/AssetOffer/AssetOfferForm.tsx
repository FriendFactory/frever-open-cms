import React from "react";
import { Form, FormProps, Input, InputNumber } from "antd";

import CoinIcon from "shared/components/CustomIcons/CoinIcon";
import GemIcon from "shared/components/CustomIcons/GemIcon";

export function AssetOfferForm(props: FormProps) {
    return (
        <Form {...props} layout="vertical">
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Soft Currency Price" name="softCurrencyPrice">
                <InputNumber controls={false} prefix={<CoinIcon />} />
            </Form.Item>
            <Form.Item label="Hard Currency Price" name="hardCurrencyPrice">
                <InputNumber controls={false} prefix={<GemIcon />} />
            </Form.Item>
        </Form>
    );
}
