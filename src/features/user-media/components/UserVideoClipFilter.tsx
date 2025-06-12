import React from "react";
import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import { Store } from "antd/lib/form/interface";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export interface UserVideoClipFilterFields {
    createdTime?: [Dayjs, Dayjs];
}

export interface UserVideoClipFilterProps {
    value: UserVideoClipFilterFields;
    onChange: (form: Store) => void;
}

export function UserVideoClipFilter({ value, onChange }: UserVideoClipFilterProps) {
    return (
        <Form layout="horizontal" initialValues={value} onFinish={onChange}>
            <Row gutter={24}>
                <Col flex="1 0 190px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="createdTime" label="Created Time">
                        <RangePicker style={{ width: "100%" }} allowEmpty={[true, true]} />
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
