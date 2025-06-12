import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row } from "antd";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";

import { UniverseListQueryParams } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";

export interface UniverseFilterFormProps {
    form: FormInstance<UniverseListQueryParams>;
    values: UniverseListQueryParams;
    onSearch: () => void;
}

export function UniverseFilterForm({ form, values, onSearch }: UniverseFilterFormProps) {
    return (
        <Form form={form} initialValues={values} layout="horizontal">
            <Row gutter={24} justify="start">
                <Col flex="180px">
                    <Form.Item name="id" label="ID">
                        <Input
                            type="number"
                            onPressEnter={onSearch}
                            allowClear={{ clearIcon: <CloseCircleFilled onClick={onSearch} /> }}
                        />
                    </Form.Item>
                </Col>
                <Col flex="250px">
                    <Form.Item name="name" label="Name">
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

                <ColAlignRight>
                    <Row gutter={[8, 16]}>
                        <Col>
                            <Form.Item name="isNew" label="Is New">
                                <Radio.Group value={values?.isNew} onChange={onSearch}>
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
