import React, { useState } from "react";
import { Col, Divider, Form, FormProps, Input, Row } from "antd";

import { availableLanguages, ISOCodes } from "../services";

const rules = [{ required: true }];

interface LocalizationFormProps extends FormProps<Partial<any>> {}

export function LocalizationForm({ ...props }: LocalizationFormProps) {
    const [inputValue, setInputValue] = useState("");

    return (
        <Form layout="vertical" {...props}>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Form.Item name="key" label="Key" rules={[...rules, { validator: validateInputKey }]}>
                        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="type" label="Type" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                </Col>

                <Divider />
                {Object.keys(availableLanguages).map((key) => {
                    const isoCode = key as ISOCodes;
                    return (
                        <Col span={24} key={key}>
                            <Form.Item
                                name={["values", key]}
                                label={availableLanguages[isoCode]}
                                rules={isoCode === "eng" ? rules : undefined}>
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    );
                })}
            </Row>
        </Form>
    );
}

const validateInputKey = (_: any, value: any) => {
    if (/^[A-Z0-9_]+$/.test(value)) return Promise.resolve();

    return Promise.reject("The Key value should be upper-case, with “_” used as a separator.");
};
