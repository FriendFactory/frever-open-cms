import React from "react";
import { Col, Divider, Form, FormProps, Input, InputNumber, Row, Select } from "antd";

import { VideoOrientation } from "../services";

const rules = [{ required: true }];

enum EnumVideoOrientation {
    SCALE_MIN = 0.0,
    SCALE_MAX = 5.0,
    OFFSET_MIN = 0.0,
    OFFSET_MAX = 1.0
}

export interface WatermarkInfoFormProps extends FormProps {}

export function WatermarkInfoForm({ ...props }: WatermarkInfoFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={24}>
                <Col sm={24} md={12}>
                    <Form.Item label="Name" name="name" rules={rules}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col sm={24} md={12}>
                    <Form.Item label="Duration Seconds" name="durationSeconds" rules={rules}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                </Col>

                <VideoOrientationFormFields />
            </Row>
        </Form>
    );
}

interface VideoOrientationFormFieldsProps {}

const VideoOrientationFormFields = ({}: VideoOrientationFormFieldsProps) => {
    return (
        <>
            {Object.keys(VideoOrientation).map((key, index) => (
                <React.Fragment key={key}>
                    <Divider orientation="left" />
                    <Col xs={24} md={12}>
                        <Form.Item label="OffsetX" name={["positions", index, "offsetX"]} rules={rules}>
                            <InputNumber
                                style={{ width: "100%" }}
                                step={0.1}
                                min={EnumVideoOrientation.OFFSET_MIN}
                                max={EnumVideoOrientation.OFFSET_MAX}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item label="OffsetY" name={["positions", index, "offsetY"]} rules={rules}>
                            <InputNumber
                                style={{ width: "100%" }}
                                step={0.1}
                                min={EnumVideoOrientation.OFFSET_MIN}
                                max={EnumVideoOrientation.OFFSET_MAX}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item label="Scale" name={["positions", index, "scale"]} rules={rules}>
                            <InputNumber
                                style={{ width: "100%" }}
                                step={0.1}
                                min={EnumVideoOrientation.SCALE_MIN}
                                max={EnumVideoOrientation.SCALE_MAX}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Video Orientation"
                            name={["positions", index, "videoOrientation"]}
                            rules={rules}>
                            <Select
                                options={Object.keys(VideoOrientation).map((key) => ({
                                    label: key,
                                    value: VideoOrientation[key as keyof typeof VideoOrientation]
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </React.Fragment>
            ))}
        </>
    );
};
