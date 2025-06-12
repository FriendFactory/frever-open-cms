import React from "react";
import { Form, FormProps, Input, Switch } from "antd";

export const WardrobeBakingAvailabilityForm = (formProps: FormProps) => {
    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item name="wardrobeId" noStyle>
                <div></div>
            </Form.Item>

            <Form.Item label="Is Available" name="isAvailable" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item shouldUpdate>
                {({ getFieldValue }) => {
                    const isAvailable = getFieldValue("isAvailable");

                    return (
                        <Form.Item label="Reason" name="reason" rules={[{ required: !isAvailable }]}>
                            <Input.TextArea />
                        </Form.Item>
                    );
                }}
            </Form.Item>
        </Form>
    );
};
