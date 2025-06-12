import React from "react";
import { Col, Form, FormProps, Input, Row } from "antd";
import { Rule } from "antd/es/form";

import { InputSlider } from "shared/components/CustomInputs";

const rules: Rule[] = [{ required: true }];

interface BackgroundAIGenerationFormProps extends FormProps {}

export function BackgroundAIGenerationForm({ ...props }: BackgroundAIGenerationFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item label="Model Version" name={["settings", "modelVersion"]} rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Width Image" name={["settings", "width"]} rules={rules}>
                        <Input type="number" min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Height Image" name={["settings", "height"]} rules={rules}>
                        <Input type="number" min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item label="LoRA Scale" name={["settings", "loraScale"]}>
                        <InputSlider min={0} max={1} step={0.01} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Guidance Scale" name={["settings", "guidanceScale"]}>
                        <InputSlider min={1} max={50} step={0.01} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Diffusion Steps" name={["settings", "diffusionSteps"]}>
                        <InputSlider min={1} max={50} step={1} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
