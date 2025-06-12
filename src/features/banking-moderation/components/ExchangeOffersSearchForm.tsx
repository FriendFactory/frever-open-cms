import React from "react";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Gutter } from "antd/es/grid/row";
import styled from "styled-components";

import { ExchangeOfferQueryParams } from "../services";

const gutter: [Gutter, Gutter] = [24, 24];

export interface ExchangeOffersSearchFormProps {
    values: ExchangeOfferQueryParams;
    onChange: (values: ExchangeOfferQueryParams) => void;
}

export function ExchangeOffersSearchForm({ values, onChange }: ExchangeOffersSearchFormProps) {
    return (
        <Form initialValues={values} onFinish={onChange} layout="horizontal">
            <Row gutter={gutter} align="bottom">
                <Col flex="220px">
                    <Form.Item label="ID" name="id">
                        <Input />
                    </Form.Item>
                </Col>

                <Col flex="240px">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                <RightAlignedCol>
                    <Form.Item>
                        <Radio.Group value={values.isEnabled} onChange={(e) => onChange({ isEnabled: e.target.value })}>
                            <Radio.Button value="true">Enabled</Radio.Button>
                            <Radio.Button value="false">Disabled</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </RightAlignedCol>
            </Row>
        </Form>
    );
}

export const RightAlignedCol = styled.div`
    margin-left: auto;
    padding-right: 12px;
`;
