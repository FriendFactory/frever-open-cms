import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

const rules: Rule[] = [
    { required: true, message: "This field is required" },
    {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: "Key must be in the right format and unique. Please use only letters, numbers and underscores."
    }
];

export function LocalizationKeyFormItem() {
    return (
        <Form.Item name="key" label="Key" rules={rules}>
            <Input />
        </Form.Item>
    );
}
