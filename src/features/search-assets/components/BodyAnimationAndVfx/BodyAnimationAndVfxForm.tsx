import React from "react";
import { Col, Form, FormInstance, FormProps, InputNumber, Row } from "antd";

import { SelectAssetFormItem } from "../SelectAssetFormItem";

interface BodyAnimationAndVfxFormProps extends FormProps {}

export function BodyAnimationAndVfxForm({ ...formProps }: BodyAnimationAndVfxFormProps) {
    return (
        <Form {...formProps} layout="vertical">
            <Row gutter={24} align="bottom">
                <Col sm={24} lg={10}>
                    <Form.Item shouldUpdate noStyle>
                        {(props: FormInstance) => (
                            <SelectAssetFormItem
                                asset="VFX"
                                label="VFX"
                                fieldName="vfxId"
                                rules={[{ required: true, message: `Please select VFX` }]}
                                {...props}
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col sm={24} lg={7}>
                    <Form.Item label="Start Time (sec)" name="startTime">
                        <InputNumber type="number" step={0.1} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col sm={24} lg={7}>
                    <Form.Item label="End Time (sec)" name="endTime">
                        <InputNumber type="number" step={0.1} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
