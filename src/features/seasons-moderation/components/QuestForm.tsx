import React from "react";
import { Form, FormProps, Input, Select } from "antd";

const { Option } = Select;

export function QuestForm(props: FormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Form.Item name="title" label="Title">
                <Input />
            </Form.Item>
            <Form.Item name="type" label="Type">
                <Select>
                    <Option value="SeasonLikes">Season Likes</Option>
                </Select>
            </Form.Item>
            <Form.Item name="value" label="Value">
                <Input type="number" />
            </Form.Item>
        </Form>
    );
}
