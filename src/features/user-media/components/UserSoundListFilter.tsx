import React from "react";
import { Row, Col, Form, Input, DatePicker, Button, Radio, RadioChangeEvent } from "antd";
import { Dayjs } from "dayjs";
import { Store } from "antd/lib/form/interface";

import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;

export interface UserSoundListFilterFields {
    id?: string;
    createdTime?: [Dayjs, Dayjs];
}

export interface UserSoundListFilterProps {
    value: UserSoundListFilterFields;
    onChange: (form: Store) => void;
}

export function UserSoundListFilter({ value, onChange }: UserSoundListFilterProps) {
    const handleChangeRadio = (fieldName: "isDraft" | "isDeleted") => (event: RadioChangeEvent) =>
        onChange({ ...value, [fieldName]: event.target.value });
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

                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <ColAlignRight>
                    <Col>
                        <Form.Item name="isDeleted" label="Is Deleted">
                            <Radio.Group onChange={handleChangeRadio("isDeleted")}>
                                <Radio.Button value={undefined}>All</Radio.Button>
                                <Radio.Button value="true">Yes</Radio.Button>
                                <Radio.Button value="false">No</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
