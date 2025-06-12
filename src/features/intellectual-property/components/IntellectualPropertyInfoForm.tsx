import React from "react";
import { Col, Form, FormProps, Input, Row, Select } from "antd";

import { SelectWithExtraDataOptions, useCurrentStage } from "shared";
import { WatermarkPageSelectorType } from "features/watermark-moderation";

const rules = [{ required: true }];

export interface IntellectualPropertyInfoFormProps extends FormProps {
    watermarks: WatermarkPageSelectorType;
}

export function IntellectualPropertyInfoForm({ watermarks, ...formProps }: IntellectualPropertyInfoFormProps) {
    const stage = useCurrentStage();
    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item label="Readiness" name="readinessId">
                        <SelectWithExtraDataOptions stage={stage} name="Readiness" />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Watermark" name="watermarkId">
                        <Select
                            allowClear
                            loading={watermarks.loading}
                            options={watermarks.data?.map((watermark) => ({
                                label: watermark.name,
                                value: watermark.id
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
