import React from "react";
import { Dayjs } from "dayjs";
import { Col, DatePicker, Form, Row } from "antd";
import { FormProps } from "antd/lib/form/Form";
import { Gutter } from "antd/es/grid/row";

import { CopySeasonType } from "../services/copySeason";

const gutter: [Gutter, Gutter] = [24, 24];

export type SeasonCopyFormData = Omit<CopySeasonType, "id"> & {
    startDate: Dayjs;
    endDate: Dayjs;
};

export function SeasonCopyForm(formProps: FormProps) {
    return (
        <Form layout="vertical" {...formProps} initialValues={initialValues}>
            <Row gutter={gutter}>
                <Col sm={24} md={12}>
                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[{ required: true, message: "This field is required" }]}>
                        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
                <Col sm={24} md={12}>
                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[{ required: true, message: "This field is required" }]}>
                        <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

const initialValues = {
    startDate: null,
    endDate: null
};
