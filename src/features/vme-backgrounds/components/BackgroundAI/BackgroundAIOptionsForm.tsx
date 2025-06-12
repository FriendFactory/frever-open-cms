import React from "react";
import { Button, Card as AntdCard, Col, Empty, Form, FormProps, Input, Row, Space } from "antd";
import { Rule } from "antd/es/form";
import { FormListProps } from "antd/lib/form";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { InputEmoji } from "shared/";
import { BackgroundAIExtraActions } from "./BackgroundAIExtraActions";

const rules: Rule[] = [{ required: true }];

interface BackgroundAIOptionsFormProps extends FormProps {}

export function BackgroundAIOptionsForm({ ...props }: BackgroundAIOptionsFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Form.List name={["settings", "sets"]}>
                {(setsFields, { add: addSet, remove: removeSet }) => (
                    <Card
                        title="Sets"
                        extra={
                            <Space.Compact>
                                <Button onClick={() => addSet()} icon={<PlusOutlined />}>
                                    Create Set
                                </Button>
                                <BackgroundAIExtraActions />
                            </Space.Compact>
                        }>
                        {setsFields.length ? (
                            setsFields.map(({ key, name, ...setField }, index) => (
                                <React.Fragment key={key}>
                                    <Card
                                        type="inner"
                                        title={`#${++index}`}
                                        extra={
                                            <Button danger onClick={() => removeSet(name)} icon={<DeleteOutlined />}>
                                                Delete Set
                                            </Button>
                                        }>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={12}>
                                                <Form.Item
                                                    label="Title"
                                                    name={[name, "title"]}
                                                    rules={rules}
                                                    {...setField}>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={12}>
                                                <Form.Item
                                                    label="Grid Columns"
                                                    name={[name, "columnsCount"]}
                                                    {...setField}>
                                                    <Input type="number" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <FormListOptions name={[name, "options"]} />
                                    </Card>
                                    <br />
                                </React.Fragment>
                            ))
                        ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )}
                    </Card>
                )}
            </Form.List>
        </Form>
    );
}

interface FormListOptionsProps extends Omit<FormListProps, "children"> {}

const FormListOptions = (props: FormListOptionsProps) => (
    <Form.List {...props}>
        {(optionsFields, { add: addOption, remove: removeOption }) => (
            <Card
                bodyStyle={{ padding: "16px 0px" }}
                bordered={false}
                actions={[
                    <Button onClick={() => addOption()} icon={<PlusOutlined />}>
                        Create Option
                    </Button>
                ]}>
                {optionsFields.length ? (
                    optionsFields.map(({ key, name, ...optionField }) => (
                        <React.Fragment key={key}>
                            <Card
                                actions={[
                                    <Button danger onClick={() => removeOption(name)} icon={<DeleteOutlined />}>
                                        Delete Option
                                    </Button>
                                ]}>
                                <Row gutter={24} justify="space-between">
                                    <Col flex="1 0 150px">
                                        <Form.Item
                                            shouldUpdate
                                            label="Display Value"
                                            name={[name, "displayValue"]}
                                            rules={rules}
                                            {...optionField}>
                                            <InputEmoji />
                                        </Form.Item>
                                    </Col>
                                    <Col flex="1 0 150px">
                                        <Form.Item
                                            label="Prompt Value"
                                            name={[name, "promptValue"]}
                                            rules={rules}
                                            {...optionField}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col flex="1 0 150px">
                                        <Form.Item label="Label" name={[name, "label"]} {...optionField}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                            <br />
                        </React.Fragment>
                    ))
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </Card>
        )}
    </Form.List>
);

const Card = styled(AntdCard)`
    .ant-card-actions > li > span {
        cursor: auto;
    }
`;
