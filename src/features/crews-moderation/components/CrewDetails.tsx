import React from "react";
import { Col, Divider, Form, FormProps, Input, Popconfirm, Row, Space, Tag } from "antd";

import { Crew } from "../services";
import { ExtraDataResult } from "shared/store";

interface CrewDetailsProps extends FormProps<Crew> {
    data: Crew;
    languages: ExtraDataResult<"Language">;
    onClickDelete: () => void;
}

export function CrewDetails({ data, onClickDelete, languages, ...formProps }: CrewDetailsProps) {
    return (
        <Row gutter={[12, 24]}>
            <Col span={24}>
                <Row>
                    <Col span={12}>
                        <Space split={<Divider type="vertical" />}>
                            <span>
                                Is Deleted: &nbsp;
                                <Tag color={data.isDeleted ? "error" : "blue"}>{data.isDeleted ? "Yes" : "No"}</Tag>
                            </span>
                            {!data.isDeleted && (
                                <Popconfirm
                                    title="Please confirm the delete action. This cannot be undone via the CMS."
                                    okText="Delete"
                                    okType="danger"
                                    onConfirm={onClickDelete}>
                                    <a>Delete</a>
                                </Popconfirm>
                            )}
                        </Space>
                    </Col>
                    <Col span={12}>
                        Is Public: &nbsp;
                        <Tag color={data.isPublic ? "blue" : "warning"}>{data.isPublic ? "Public" : "Private"}</Tag>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={12}>
                        <Space split={<Divider type="vertical" />}>
                            <span>
                                Language: &nbsp;
                                {languages?.data?.find((language) => language.id === data.languageId)?.name ??
                                    "Unknown"}
                            </span>
                        </Space>
                    </Col>
                    <Col span={12}>
                        Trophy Score: &nbsp;
                        {data.trophyScore}
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Form {...formProps} initialValues={data} layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item name="name" label="Name" required>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item name="description" label="Description">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
}
