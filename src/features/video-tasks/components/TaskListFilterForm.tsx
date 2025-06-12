import React, { useCallback } from "react";
import { Button, Col, Form, Input, Row, DatePicker, Radio, RadioChangeEvent, Select } from "antd";
import { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

import { TaskListQueryParams } from "../services";
import { SelectWithExtraDataOptions } from "shared";
import { taskType } from "../constants";

const { RangePicker } = DatePicker;
const allowEmpty: [boolean, boolean] = [true, true];

export interface TaskListFilterParams
    extends Omit<TaskListQueryParams, "modifiedTime" | "createdTime" | "skip" | "take" | "orderBy" | "sortDirection"> {
    modifiedTime?: [Dayjs, Dayjs];
    createdTime?: [Dayjs, Dayjs];
}

export interface TaskListFilterFormProps {
    stage: string;
    value: TaskListFilterParams;
    onChange: (value: TaskListFilterParams) => void;
}

export function TaskListFilterForm({ stage, value, onChange }: TaskListFilterFormProps) {
    const handleChangeFilter = useCallback(
        (name: "isDressed" | "deletionAllowed") => (event: RadioChangeEvent) =>
            onChange({ [name]: event.target.value }),
        [onChange, value]
    );

    const handleChangeReadiness = useCallback(
        (readiness: string | string[] | undefined) => onChange({ readiness }),
        [onChange, value]
    );

    const handleChangeTaskType = useCallback((taskType: number) => onChange({ taskType }), [onChange, value]);

    const readinessValue =
        typeof value.readiness === "string" ? [Number(value.readiness)] : value.readiness?.map((el) => Number(el));

    return (
        <Form layout="horizontal" initialValues={value} onFinish={onChange}>
            <Row gutter={22}>
                <Col flex="1 0 140px">
                    <Form.Item name="id" label="ID">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 220px">
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="1 0 360px">
                    <Form.Item name="createdTime" label="Created">
                        <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 360px">
                    <Form.Item name="modifiedTime" label="Modified">
                        <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>

                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" ghost icon={<SearchOutlined />} htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="Is Dressed">
                        <Radio.Group value={value.isDressed} onChange={handleChangeFilter("isDressed")}>
                            <Radio.Button value={"true"}>Yes</Radio.Button>
                            <Radio.Button value={"false"}>No</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="Deletion Allowed">
                        <Radio.Group value={value.deletionAllowed} onChange={handleChangeFilter("deletionAllowed")}>
                            <Radio.Button value={"true"}>Yes</Radio.Button>
                            <Radio.Button value={"false"}>No</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col flex="1 0 420px">
                    <Form.Item label="Readiness">
                        <SelectWithExtraDataOptions
                            stage={stage}
                            name="Readiness"
                            allowClear
                            mode="multiple"
                            maxTagCount="responsive"
                            value={readinessValue}
                            onChange={handleChangeReadiness}
                        />
                    </Form.Item>
                </Col>
                <Col flex="1 0 400px">
                    <Form.Item label="Task Type">
                        <Select
                            onChange={handleChangeTaskType}
                            defaultValue={value?.taskType && +value.taskType}
                            allowClear
                            options={taskType.map((el) => ({ label: el.name, value: el.id }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
