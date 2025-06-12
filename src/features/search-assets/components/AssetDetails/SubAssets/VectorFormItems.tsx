import React from "react";
import { Col, Divider, Form, Input } from "antd";

const vectors = ["x", "y", "z"] as const;

interface VectorFormItemsProps {
    label: string;
    fieldName: string;
}

export const VectorFormItems = ({ label, fieldName }: VectorFormItemsProps) => {
    return (
        <>
            <Divider orientation="left">{label}</Divider>
            {vectors.map((vector) => (
                <Col xs={24} sm={24} xl={12} xxl={8} key={vector}>
                    <Form.Item label={`${vector.toUpperCase()}`} name={[fieldName, vector]}>
                        <Input type="number" style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            ))}
        </>
    );
};
