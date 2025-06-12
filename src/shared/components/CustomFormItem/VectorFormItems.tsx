import React from "react";
import { Col, Form, FormItemProps, InputNumber, InputNumberProps } from "antd";

const axes = ["x", "y", "z"] as const;

interface VectorFormItemsProps {
    name: (axis: typeof axes[number]) => FormItemProps["name"];
    extraFormItemProps?: Omit<FormItemProps, "name">;
    extraInputProps?: InputNumberProps;
}

export const VectorFormItems = ({ name, extraFormItemProps, extraInputProps }: VectorFormItemsProps) => {
    return (
        <>
            {axes.map((axis) => (
                <Col key={axis} xs={24} sm={24} xl={12} xxl={8}>
                    <Form.Item label={axis.toUpperCase()} name={name(axis)} {...extraFormItemProps}>
                        <InputNumber step={0.1} style={{ width: "100%" }} {...extraInputProps} />
                    </Form.Item>
                </Col>
            ))}
        </>
    );
};
