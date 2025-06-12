import React from "react";
import { Button, Col, Form, Input, Row, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

import { InAppProductsQueryParams } from "../services";

const { RangePicker } = DatePicker;
const allowEmpty: [boolean, boolean] = [true, true];

export interface InAppProductListFilterParams
    extends Omit<InAppProductsQueryParams, "publicationDate" | "depublicationDate"> {
    publicationDate?: [Dayjs, Dayjs];
    depublicationDate?: [Dayjs, Dayjs];
}

export interface InAppProductListFilterProps {
    values: InAppProductListFilterParams;
    onChange: (value: InAppProductListFilterParams) => void;
}

export function InAppProductListFilter({ values, onChange }: InAppProductListFilterProps) {
    return (
        <Form layout="horizontal" initialValues={values} onFinish={onChange}>
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
                    <Form.Item name="publicationDate" label="Publication">
                        <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 360px">
                    <Form.Item name="depublicationDate" label="Depublication">
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
