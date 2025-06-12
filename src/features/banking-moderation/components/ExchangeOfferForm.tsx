import React from "react";
import { Col, Form, FormProps, Input, Row, Switch } from "antd";
import { Gutter } from "antd/es/grid/row";

import { ExchangeOffer } from "features/banking-moderation/services";

const gutter: [Gutter, Gutter] = [24, 24];

export interface ExchangeOfferFormProps extends FormProps {
    initialValues?: ExchangeOffer;
}

export const ExchangeOfferForm = (props: ExchangeOfferFormProps) => {
    return (
        <Form layout="vertical" {...props}>
            <Row gutter={gutter}>
                <Col xs={24} md={12}>
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Sort Order" name="sortOrder">
                        <Input type="number" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Hard Currency Required" name="hardCurrencyRequired">
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Soft Currency Given" name="softCurrencyGiven">
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Enabled" name="isEnabled" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
