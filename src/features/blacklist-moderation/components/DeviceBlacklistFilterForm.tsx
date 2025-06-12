import React from "react";
import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";

import { DeviceBlacklistQueryParams } from "../services";

export interface DeviceBlacklistFilterFormProps {
    form: FormInstance<DeviceBlacklistQueryParams>;
    values: DeviceBlacklistQueryParams;
    onSearch: () => void;
}

export function DeviceBlacklistFilterForm({ form, values, onSearch }: DeviceBlacklistFilterFormProps) {
    return (
        <Form form={form} initialValues={values} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="350px">
                    <Form.Item name="search" label="Search">
                        <Input
                            onPressEnter={onSearch}
                            allowClear={{ clearIcon: <CloseCircleFilled onClick={onSearch} /> }}
                        />
                    </Form.Item>
                </Col>
                <Col flex="121px">
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
