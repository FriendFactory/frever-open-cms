import React from "react";

import { Row, Col, Input, Form, Radio, RadioChangeEvent, Select, Button } from "antd";
import { allowedActivityTypesOptions } from "./BotForm";
import { BotListQueryParams } from "../services";
import { UserSearchFieldContainer } from "shared/containers/UserSearchFieldContainer";

export interface BotFilterFields extends BotListQueryParams {}

export interface BotFilterProps {
    values: BotFilterFields;
    onChange: (newValues: BotFilterFields) => void;
}

export function BotFilterForm({ values, onChange }: BotFilterProps) {
    const handleChangeRadio = (fieldName: "isEnabled" | "runInSimulationMode") => (event: RadioChangeEvent) => {
        onChange({ ...values, [fieldName]: event.target.value });
    };

    const handleChangeMultiSelect = (value: string) => {
        onChange({ ...values, allowedActivityTypes: value });
    };

    return (
        <Form initialValues={values} onFinish={onChange} layout="horizontal">
            <Row align="bottom" gutter={24}>
                <Col flex="1 0 220px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 240px">
                    <Form.Item name="groupId" label="User">
                        <UserSearchFieldContainer />
                    </Form.Item>
                </Col>
                <Col flex="1 0 300px">
                    <Form.Item name="allowedActivityTypes" label="Activity Types">
                        <Select
                            onChange={handleChangeMultiSelect}
                            mode="multiple"
                            allowClear
                            placeholder="Please select"
                            options={allowedActivityTypesOptions}
                            maxTagCount="responsive"
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <Col>
                    <Row gutter={24}>
                        <Col>
                            <Form.Item label="Is Enabled">
                                <Radio.Group onChange={handleChangeRadio("isEnabled")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="Is Simulation Mode">
                                <Radio.Group onChange={handleChangeRadio("runInSimulationMode")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
}
