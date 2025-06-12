import React from "react";
import { Dayjs } from "dayjs";
import { Col, DatePicker, Form, Input, Row } from "antd";
import { FormProps } from "antd/lib/form/Form";
import { Gutter } from "antd/es/grid/row";

import { SeasonBaseInfo } from "../services";

const gutter: [Gutter, Gutter] = [24, 24];

export type SeasonCreationFormData = Omit<SeasonBaseInfo, "id"> & {
    startDate: Dayjs;
    endDate: Dayjs;
};

export function SeasonBaseInfoForm(formProps: FormProps) {
    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={gutter}>
                <Col span={24}>
                    <Form.Item
                        rules={[{ required: true, message: "This field is required" }]}
                        name="title"
                        label="Title">
                        <Input name="name" />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item name="startDate" label="Start Date">
                        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item name="endDate" label="End Date">
                        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
