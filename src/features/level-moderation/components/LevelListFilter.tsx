import React from "react";
import { Row, Col, Form, Input, DatePicker, Radio, Button, RadioChangeEvent } from "antd";
import { Dayjs } from "dayjs";
import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;

export interface LevelListFilterFields {
    createdTime?: [Dayjs, Dayjs];
    modifiedTime?: [Dayjs, Dayjs];
}

export interface LevelListFilterProps {
    value: LevelListFilterFields;
    onChange: (form: any) => void;
}

export function LevelListFilter({ value, onChange }: LevelListFilterProps) {
    const handleChangeRadio = (fieldName: "isDraft" | "isDeleted") => (event: RadioChangeEvent) =>
        onChange({ ...value, [fieldName]: event.target.value });

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
                        <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="modifiedTime" label="Modified Time">
                        <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 210px">
                    <Form.Item name="templateId" label="Template ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 270px">
                    <Form.Item name="remixFrom" label="Remix From ID">
                        <Input type="number" />
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
                    <Row gutter={[8, 16]}>
                        <Col>
                            <Form.Item name="isDraft" label="Is Draft">
                                <Radio.Group onChange={handleChangeRadio("isDraft")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isDeleted" label="Is Deleted">
                                <Radio.Group onChange={handleChangeRadio("isDeleted")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
