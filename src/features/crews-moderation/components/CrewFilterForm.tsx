import React, { useState } from "react";
import { Button, Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";

import { ColAlignRight } from "shared/components/ColAlignRight";
import { ExtraDataResult } from "shared/store";
import { selectFilterProps } from "shared";

const { Option } = Select;

export type UnitTimeType = "date" | "week" | "month";
export interface CrewFilterFormFields {
    id?: number;
    name?: string;
    description?: string;
    isPublic?: "true" | "false";
    isDeleted?: "true" | "false";
    unitTime?: string;
    messagesTime?: Dayjs;
}

export interface CrewFilterFormProps {
    form: FormInstance<CrewFilterFormFields>;
    value?: CrewFilterFormFields;
    languages: ExtraDataResult<"Language">;
    onSearch: () => void;
}

export function CrewFilterForm({ form, value, onSearch, languages }: CrewFilterFormProps) {
    const [type, setType] = useState<UnitTimeType>((value?.unitTime as UnitTimeType) || "date");
    return (
        <Form form={form} initialValues={value}>
            <Row gutter={24} justify="start">
                <Col flex="1 0 160px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 220px">
                    <Form.Item name="name" label="Name">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 300px">
                    <Form.Item name="description" label="Description">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col flex="1 0 340px">
                    <Form.Item name="language" label="Language">
                        <Select
                            {...selectFilterProps}
                            onChange={onSearch}
                            showSearch
                            allowClear
                            options={languages?.data
                                ?.map((el) => ({ label: el.name, value: String(el.id) }))
                                .concat({ label: "<Null>", value: "null" })}
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Space.Compact block>
                        <Form.Item name="unitTime" label="Top Messages">
                            <Select onChange={setType} style={{ width: 90 }}>
                                <Option value="date">Day</Option>
                                <Option value="week">Week</Option>
                                <Option value="month">Month</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="messagesTime">
                            <DatePicker picker={type} onChange={onSearch} />
                        </Form.Item>
                    </Space.Compact>
                </Col>
                <Col flex="121px">
                    <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                        Search
                    </Button>
                </Col>

                <ColAlignRight>
                    <Row gutter={[8, 16]}>
                        <Col>
                            <Form.Item name="isPublic" label="">
                                <Radio.Group onChange={onSearch} name="isPublic">
                                    <Radio.Button value={"true"}>Public</Radio.Button>
                                    <Radio.Button value={"false"}>Private</Radio.Button>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isDeleted" label="">
                                <Radio.Group onChange={onSearch} name="isDeleted">
                                    <Radio.Button value={"true"}>Deleted</Radio.Button>
                                    <Radio.Button value={"false"}>Active</Radio.Button>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
