import React from "react";
import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import { Dayjs } from "dayjs";
import { Store } from "antd/lib/form/interface";

const { RangePicker } = DatePicker;

export interface UserPhotoListFilterFields {
    id?: string;
    createdTime?: [Dayjs, Dayjs];
    modifiedTime?: [Dayjs, Dayjs];
}

export interface UserPhotoListFilterProps {
    value: UserPhotoListFilterFields;
    onChange: (form: Store) => void;
}

export function UserPhotoListFilter({ value, onChange }: UserPhotoListFilterProps) {
    return (
        <Form layout="horizontal" initialValues={value} onFinish={onChange}>
            <Row gutter={24}>
                <Col flex="1 0 190px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="createdTime" label="Created Time">
                        <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="modifiedTime" label="Modified Time">
                        <RangePicker style={{ width: "100%" }} />
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
