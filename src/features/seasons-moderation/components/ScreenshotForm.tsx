import React from "react";
import { Form, FormProps, Input, Space } from "antd";

import { ImageFormField, ImageResolution } from "shared";

export interface ScreenshotFormProps extends FormProps {
    requiredResolution: ImageResolution;
}

export function ScreenshotForm({ requiredResolution, ...props }: ScreenshotFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Space direction="vertical" style={{ width: "100%" }}>
                {/* <Typography.Text type="secondary">{`Image size should be ${requiredResolution.join(
                    "x"
                )}`}</Typography.Text> */}
                {/* <ImageFormField pathname="thumbnail" requiredResolution={requiredResolution} /> */}
                <ImageFormField pathname="thumbnail" />
            </Space>
            <Form.Item name="Ordinal" label="Ordinal">
                <Input />
            </Form.Item>
        </Form>
    );
}
