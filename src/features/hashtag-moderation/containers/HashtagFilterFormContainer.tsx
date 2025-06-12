import React, { useCallback } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useHistory, useLocation } from "react-router";

import { GetHashtagListParams } from "../services";
import { HASHTAG_LIST_PAGE_URL } from "urls";

export interface HashtagFilterFormContainerProps {}

export function HashtagFilterFormContainer({}: HashtagFilterFormContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = HASHTAG_LIST_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const handleChange = useCallback(
        (form: GetHashtagListParams) => {
            const newUrl = HASHTAG_LIST_PAGE_URL.replace(location, {}, { skip: 0, ...form });

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const values = urlMatch.query || {};

    return (
        <Form initialValues={values} onFinish={handleChange} layout="horizontal">
            <Row gutter={24}>
                <Col flex="380px">
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
