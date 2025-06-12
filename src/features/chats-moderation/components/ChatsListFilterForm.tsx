import React from "react";
import { Button, Col, Form, FormInstance, Input, Radio, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { ChatListQueryParams } from "../services";
import { UserSearchFieldContainer } from "shared/containers/UserSearchFieldContainer";
import { ColAlignRight } from "shared/components/ColAlignRight";

export interface ChatsListFilterFormProps {
    form: FormInstance<ChatListQueryParams>;
    initialValues: ChatListQueryParams;
    onSearch: () => void;
}

export function ChatsListFilterForm({ form, initialValues, onSearch }: ChatsListFilterFormProps) {
    return (
        <Form form={form} initialValues={initialValues} onFinish={onSearch}>
            <Row gutter={24} justify="start">
                <Col flex="220px">
                    <Form.Item name="title" label="Title">
                        <Input onPressEnter={onSearch} />
                    </Form.Item>
                </Col>

                <Col flex="600px">
                    <Form.Item name="members" label="Members">
                        <UserSearchFieldContainer mode="multiple" />
                    </Form.Item>
                </Col>

                <Col flex="121px">
                    <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                        Search
                    </Button>
                </Col>

                <ColAlignRight>
                    <Form.Item name="isDeleted" label="">
                        <Radio.Group onChange={onSearch} name="isDeleted">
                            <Radio.Button value={"true"}>Deleted</Radio.Button>
                            <Radio.Button value={"false"}>Active</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
