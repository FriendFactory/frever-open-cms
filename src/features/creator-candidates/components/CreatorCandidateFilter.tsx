import React from "react";
import { Button, Col, DatePicker, Form, FormProps, Input, Row } from "antd";
import { Dayjs } from "dayjs";

import { CreatorCandidatesQueryParams } from "../services";

export interface CreatorCandidateFormInitialValues
    extends Omit<CreatorCandidatesQueryParams, "createdTime" | "modifiedTime"> {
    createdTime?: [Dayjs, Dayjs];
    modifiedTime?: [Dayjs, Dayjs];
}

export interface CreatorCandidateFilterProps extends FormProps {
    initialValues: CreatorCandidateFormInitialValues;
    onFinish: (newValues: CreatorCandidateFormInitialValues) => void;
}

export function CreatorCandidateFilter(props: CreatorCandidateFilterProps) {
    return (
        <Form layout="horizontal" {...props}>
            <Row gutter={24}>
                <Col flex="1 0 160px">
                    <Form.Item label="ID" name="id">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 320px">
                    <Form.Item label="Created" name="createdTime">
                        <DatePicker.RangePicker style={{ width: "100%" }} allowClear />
                    </Form.Item>
                </Col>

                <Col flex="1 0 320px">
                    <Form.Item label="Modified" name="modifiedTime">
                        <DatePicker.RangePicker style={{ width: "100%" }} allowClear />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
