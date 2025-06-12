import React from "react";
import { Form, FormProps, Input, Switch } from "antd";

import { ImageFormField } from "shared";
import { LocalizationFormItems } from "./LocalizationFormItems";
import { LocalizationKeyFormItem } from "./LocalizationKeyFormItem";

export interface CreateQuestGroupFormProps extends FormProps {}

export function CreateQuestGroupForm({ ...formProps }: CreateQuestGroupFormProps) {
    return (
        <Form layout="vertical" {...formProps}>
            <ImageFormField pathname="thumbnail" />
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

            <Form.Item name="ordinal" label="Ordinal">
                <Input type="number" />
            </Form.Item>

            <Form.Item name="isEnabled" label="Is Enabled" valuePropName="checked">
                <Switch />
            </Form.Item>

            <LocalizationFormItems fieldName="title" />
            <LocalizationFormItems fieldName="description" />
        </Form>
    );
}
