import React from "react";
import { Row, Col, Input, Form, Radio, RadioChangeEvent, Button } from "antd";

import { BotCommentListQueryParams } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";

export interface BotCommentsFilterFields extends BotCommentListQueryParams {}

export interface BotCommentsFilterProps {
    values: BotCommentsFilterFields;
    onChange: (newValues: BotCommentsFilterFields) => void;
}

export function BotCommentsFilterForm({ values, onChange }: BotCommentsFilterProps) {
    const handleChangeRadio = (event: RadioChangeEvent) => {
        onChange({ ...values, isEnabled: event.target.value });
    };

    return (
        <Form initialValues={values} onFinish={onChange} layout="horizontal">
            <Row align="bottom" gutter={24}>
                <Col flex="1 0 220px">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                </Col>
                <Col flex="1 0 300px">
                    <Form.Item name="commentText" label="Comment Text">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={{ flex: "100%" }}>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <ColAlignRight>
                    <Form.Item label="Is Enabled">
                        <Radio.Group onChange={handleChangeRadio}>
                            <Radio.Button value={undefined}>All</Radio.Button>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
