import React from "react";
import { Row, Col, Input, Form, Button, DatePicker, Select } from "antd";
import { Dayjs } from "dayjs";

import { ColAlignRight } from "shared/components/ColAlignRight";
import { ScheduledMessageQueryParams } from "features/community-moderation/services/scheduledMessage/getScheduledMessage";
import { scheduledMessageStatuses } from "features/community-moderation/services/api";

const { RangePicker } = DatePicker;

export interface ScheduledMessageFilterFormFields extends Omit<ScheduledMessageQueryParams, "scheduledForTime"> {
    scheduledForTime?: [Dayjs, Dayjs];
}

export interface ScheduledMessageFilterFormProps {
    values: ScheduledMessageFilterFormFields;
    onChange: (newValues: ScheduledMessageFilterFormFields) => void;
}

export function ScheduledMessageFilterForm({ values, onChange }: ScheduledMessageFilterFormProps) {
    const filterStatus = (value?: string) => onChange({ ...values, status: value });
    return (
        <Form initialValues={values} onFinish={onChange} layout="horizontal">
            <Row align="bottom" gutter={24}>
                <Col flex="220px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 300px">
                    <Form.Item name="text" label="Text">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="scheduledForTime" label="Scheduled Time">
                        <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <ColAlignRight flex="250px">
                    <Form.Item name="status" label="Status">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            onChange={filterStatus}
                            options={scheduledMessageStatuses.map((val) => ({ label: val, value: val }))}
                        />
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
