import React from "react";
import { Row, Col, Form, Input, DatePicker, Button, Radio, RadioChangeEvent } from "antd";
import { Dayjs } from "dayjs";

import { OutfitListQueryParams } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;

export interface OutfitListFilterParams extends Omit<OutfitListQueryParams, "createdTime" | "modifiedTime"> {
    createdTime?: [Dayjs, Dayjs];
    modifiedTime?: [Dayjs, Dayjs];
}

export interface UserOutfitListFilterProps {
    values: OutfitListFilterParams;
    onChange: (form: OutfitListFilterParams) => void;
}

export function UserOutfitListFilter({ values, onChange }: UserOutfitListFilterProps) {
    const handleOnChangeDeleteFilter = (event: RadioChangeEvent) => {
        onChange({ isDeleted: event.target.value });
    };
    return (
        <Form layout="horizontal" initialValues={values} onFinish={onChange}>
            <Row gutter={24}>
                <Col flex="1 0 220px">
                    <Form.Item name="id" label="Outfit ID">
                        <Input type="number" />
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
                <Col xs={{ flex: "100%" }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <ColAlignRight>
                    <Form.Item name="isDeleted" label="Deleted">
                        <Radio.Group onChange={handleOnChangeDeleteFilter}>
                            <Radio.Button value={undefined}>All</Radio.Button>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
