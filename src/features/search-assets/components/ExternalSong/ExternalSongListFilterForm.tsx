import React from "react";
import { Button, Col, Form, Input, Row, Radio, RadioChangeEvent, Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/lib/select";
import { Dayjs } from "dayjs";

import { ExternalSongListQueryParams } from "features/search-assets/services";
import { ColAlignRight } from "shared/components/ColAlignRight";

export interface ExternalSongFilterParams extends Omit<ExternalSongListQueryParams, "licenseTime"> {
    licenseTime?: [Dayjs, Dayjs];
}

export interface ExternalSongListFilterFormProps {
    value: ExternalSongFilterParams;
    onChange: (value: ExternalSongFilterParams) => void;
    countriesOptions?: DefaultOptionType[];
}

export function ExternalSongListFilterForm({ value, countriesOptions, onChange }: ExternalSongListFilterFormProps) {
    const handleChangeFilter = (event: RadioChangeEvent) => {
        const newValue: ExternalSongFilterParams = { ...value, isDeleted: event.target.value };
        onChange(newValue);
    };

    return (
        <Form layout="horizontal" initialValues={value} onFinish={onChange}>
            <Row gutter={24}>
                <Col flex="1 0 140px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item name="externalTrackId" label="External Track">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item name="songName" label="Song">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 330px">
                    <Form.Item name="artistName" label="Artist">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item name="isrc" label="ISRC">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 300px">
                    <Form.Item name="countries" label="Excluded Countries">
                        <Select
                            filterOption={(input, option) =>
                                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA.label as string).localeCompare(optionB.label as string)
                            }
                            allowClear
                            mode="multiple"
                            maxTagCount="responsive"
                            options={countriesOptions}
                        />
                    </Form.Item>
                </Col>

                <Col flex="1 0 320px">
                    <Form.Item name="licenseTime" label="Last License Check">
                        <DatePicker.RangePicker style={{ width: "100%" }} allowClear />
                    </Form.Item>
                </Col>

                <Col flex="1 0 136px">
                    <Form.Item>
                        <Button type="primary" ghost icon={<SearchOutlined />} htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <ColAlignRight>
                    <Form.Item>
                        <Radio.Group value={value.isDeleted} onChange={handleChangeFilter}>
                            <Radio.Button value={"true"}>Deleted</Radio.Button>
                            <Radio.Button value={"false"}>Active</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
