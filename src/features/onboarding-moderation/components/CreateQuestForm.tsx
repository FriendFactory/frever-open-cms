import React from "react";

import { Form, FormProps, Input, Select, Switch } from "antd";
import { LocalizationFormItems } from "./LocalizationFormItems";
import { LocalizationKeyFormItem } from "./LocalizationKeyFormItem";

export interface CreateQuestFormProps extends FormProps {
    questTypes: string[];
}

export function CreateQuestForm({ questTypes, ...formProps }: CreateQuestFormProps) {
    return (
        <Form layout="vertical" {...formProps}>
            <LocalizationKeyFormItem />
            <Form.Item
                name={["title", "eng"]}
                label="Title"
                rules={[{ required: true, message: "This field is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item name={["description", "eng"]} label="Description">
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="questType"
                label="Quest Type"
                rules={[{ required: true, message: "This field is required" }]}>
                <Select options={questTypes.sort().map((questType) => ({ label: questType, value: questType }))} />
            </Form.Item>

            <Form.Item name="ordinal" label="Ordinal">
                <Input type="number" />
            </Form.Item>

            <Form.Item name="questParameter" label="Quest Parameter">
                <Input type="number" />
            </Form.Item>

            <Form.Item name="isEnabled" label="Enabled" valuePropName="checked" initialValue={true}>
                <Switch />
            </Form.Item>

            <LocalizationFormItems fieldName="title" />
            <LocalizationFormItems fieldName="description" />
        </Form>
    );
}
