import React from "react";
import { Form, Input, Row, Col, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { SelectImage } from "./SelectImage";
import { SelectVideo } from "./SelectVideo";
import { useChatInfo } from "features/community-moderation/hooks/useChatInfo";
import { useCurrentStage } from "shared";

interface FormMessageItemsProps {
    id?: number;
}

export function FormMessageItems({ id }: FormMessageItemsProps) {
    const stage = useCurrentStage();
    const { freverofficialGroups, loading } = useChatInfo({ stage });

    const disablePastDates = (current: Dayjs) => {
        return current && current < dayjs().startOf("day");
    };

    return (
        <Row gutter={24} align="bottom">
            <Form.Item name="image" noStyle rules={[{ required: false }]}>
                <div></div>
            </Form.Item>
            <Form.Item name="videoId" noStyle rules={[{ required: false }]}>
                <div></div>
            </Form.Item>

            <Col span={24}>
                <SelectImage id={id} />
            </Col>
            <Col span={24}>
                <SelectVideo />
            </Col>

            <Col span={24}>
                <Form.Item name="text" label="Text">
                    <Input.TextArea style={{ resize: "none" }} autoSize={{ minRows: 4, maxRows: 8 }} />
                </Form.Item>
            </Col>

            <Col xs={24} xl={12}>
                <Form.Item
                    name="senderGroupId"
                    label="Official Account"
                    rules={[{ required: true, message: "Please select official account" }]}>
                    <Select
                        placeholder="Select official account..."
                        loading={loading}
                        options={freverofficialGroups.map((val) => ({ label: val.nickName, value: val.id }))}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} xl={12}>
                <Form.Item label="Scheduled Time" name="scheduledForTime">
                    <DatePicker
                        disabledDate={disablePastDates}
                        style={{ width: "100%" }}
                        showTime={{ format: "HH:mm" }}
                        format="DD MMM YYYY HH:mm"
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}
