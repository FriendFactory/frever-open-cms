import React from "react";
import { Col, Form, FormInstance, Row } from "antd";

import { SelectMarketingCountries } from "shared";
import { PromotedSongListQueryParams } from "../services";

export interface PromotedSongFilterFormFields extends PromotedSongListQueryParams {}

export interface PromotedSongFilterFormProps {
    form: FormInstance<PromotedSongFilterFormFields>;
    value?: PromotedSongFilterFormFields;
    onSearch: () => void;
}

export function PromotedSongFilterForm({ form, value, onSearch }: PromotedSongFilterFormProps) {
    return (
        <Form form={form} initialValues={value}>
            <Row gutter={24} justify="start">
                <Col flex="1 0 340px">
                    <Form.Item name="marketingCountries" label="Market countries/areas">
                        <SelectMarketingCountries maxTagCount="responsive" onChange={onSearch} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
