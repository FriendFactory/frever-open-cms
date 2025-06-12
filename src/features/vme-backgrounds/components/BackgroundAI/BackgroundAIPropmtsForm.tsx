import React from "react";
import { Button, Card, Col, Empty, Form, FormProps, Input, Row } from "antd";
import { Rule } from "antd/es/form";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const rules: Rule[] = [{ required: true }];

interface BackgroundAIPropmtsFormProps extends FormProps {}

export function BackgroundAIPropmtsForm({ ...props }: BackgroundAIPropmtsFormProps) {
    return (
        <Form layout="vertical" {...props}>
            <Form.List name={["settings", "prompts"]}>
                {(setsFields, { add: addSet, remove: removeSet }) => (
                    <Card title="Prompts" extra={<Button onClick={() => addSet()} icon={<PlusOutlined />}></Button>}>
                        {setsFields.length ? (
                            setsFields.map(({ key, name, ...setField }, index) => (
                                <React.Fragment key={key}>
                                    <Card
                                        type="inner"
                                        title={`#${index + 1}`}
                                        extra={
                                            <Button
                                                danger
                                                onClick={() => removeSet(name)}
                                                icon={<DeleteOutlined />}></Button>
                                        }>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={12}>
                                                <Form.Item
                                                    label="Weight"
                                                    name={[name, "weight"]}
                                                    rules={...rules}
                                                    {...setField}>
                                                    <Input type="number" min={0} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={12}>
                                                <Form.Item
                                                    label="Text"
                                                    name={[name, "text"]}
                                                    {...setField}
                                                    rules={[...rules, { max: 1024 }]}>
                                                    <TextArea autoSize={{ minRows: 1 }} />
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
        </Form>
    );
}
