import React from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";

import { CategoryFormItemType } from "../form-items";

export function renderCategoryFormItems(items: CategoryFormItemType[]) {
    return items?.map(({ itemProps, inputProps }) => (
        <Form.Item key={itemProps.name} {...itemProps}>
            {createInput(inputProps)}
        </Form.Item>
    ));
}

const createInput = (props: CategoryFormItemType["inputProps"]) =>
    props.type === "select" ? (
        <Select {...props} />
    ) : props.type === "date" ? (
        <DatePicker {...props} />
    ) : props.type === "string" ? (
        <Input />
    ) : props.type === "number" ? (
        <InputNumber controls={false} />
    ) : null;
