import React from "react";
import { Button, Col, DatePicker, Form, FormInstance, Input, Radio, Row } from "antd";
import { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;

export interface ReportedChatMessageFilterFormFields {
    id?: string;
    groupId?: string;
    date?: [Dayjs, Dayjs];
    closed?: "true" | "false";
}

export interface ReportedChatMessageFilterFormProps {
    form: FormInstance<ReportedChatMessageFilterFormFields>;
    value?: ReportedChatMessageFilterFormFields;
    onSearch: () => void;
}

export function ReportedChatMessageFilterForm({ form, value, onSearch }: ReportedChatMessageFilterFormProps) {
    return (
        <Form form={form} initialValues={value}>
            <Row gutter={24} justify="start">
                <Col flex="1 0 160px">
                    <Form.Item name="id" label="ID">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 220px">
                    <Form.Item name="groupId" label="Group ID">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="date" label="Date range">
                        <RangePicker
                            style={{ width: "100%" }}
                            onCalendarChange={(date) => {
                                if (!date || (date[0] && date[1])) onSearch();
                            }}
                            allowEmpty={[true, true]}
                        />
                    </Form.Item>
                </Col>
                <Col flex="121px">
                    <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                        Search
                    </Button>
                </Col>
                <ColAlignRight>
                    <Form.Item name="closed" label="">
                        <Radio.Group onChange={onSearch} name="showClosed">
                            <Radio.Button value={"true"}>Closed</Radio.Button>
                            <Radio.Button value={"false"}>Open</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
