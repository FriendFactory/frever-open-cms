import React from "react";
import { Button, Col, Form, Input, Row, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

import { SeasonListQueryParams } from "../services";

const { RangePicker } = DatePicker;
const allowEmpty: [boolean, boolean] = [true, true];

export interface SeasonListFilterParams
    extends Omit<SeasonListQueryParams, "startDate" | "endDate" | "skip" | "take" | "orderBy" | "sortDirection"> {
    startDate?: [Dayjs, Dayjs];
    endDate?: [Dayjs, Dayjs];
}

export interface SeasonListFilterFormProps {
    value: SeasonListFilterParams;
    onChange: (value: SeasonListFilterParams) => void;
}

export function SeasonListFilterForm({ value, onChange }: SeasonListFilterFormProps) {
    return (
        <Form layout="horizontal" initialValues={value} onFinish={onChange}>
            <Row gutter={16}>
                <Col flex="1 0 140px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 360px">
                    <Form.Item name="startDate" label="Start Date">
                        <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 360px">
                    <Form.Item name="endDate" label="End Date">
                        <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button type="primary" ghost icon={<SearchOutlined />} htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
