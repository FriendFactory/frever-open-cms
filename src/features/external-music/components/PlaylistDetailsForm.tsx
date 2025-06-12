import React from "react";
import { Col, ColProps, Form, FormProps, Input, Row, Select } from "antd";
import { Gutter } from "antd/lib/grid/row";

import { SelectWithExtraDataOptions } from "shared";
import { ExtraDataResult } from "shared/store";

export interface PlaylistDetailsFormProps extends FormProps {
    stage: string;
    colProps?: ColProps;
    gutter?: [Gutter, Gutter];
    countries?: ExtraDataResult<"Country">["data"];
}

export function PlaylistDetailsForm({ stage, gutter, colProps, countries, ...formProps }: PlaylistDetailsFormProps) {
    return (
        <Form layout="vertical" {...formProps}>
            <Row gutter={gutter}>
                <Col span={24} {...colProps}>
                    <Form.Item
                        rules={[{ required: true, message: "This field is required" }]}
                        name={["externalPlaylist", "name"]}
                        label="Name">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} {...colProps}>
                    <Form.Item name="readinessId" label="Readiness">
                        <SelectWithExtraDataOptions stage={stage} name="Readiness" />
                    </Form.Item>
                </Col>
                <Col span={24} {...colProps}>
                    <Form.Item name="sortOrder" label="Sort Order">
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col span={24} {...colProps}>
                    <Form.Item name={["externalPlaylist", "status"]} label="Status">
                        <Select>
                            <Select.Option value="dublished">Published</Select.Option>
                            <Select.Option value="draft">Draft</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} {...colProps}>
                    <Form.Item name={["externalPlaylist", "visibility"]} label="Visibility">
                        <Select>
                            <Select.Option value="public">Public</Select.Option>
                            <Select.Option value="draft">Private</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="countries" label="Countries">
                        <Select
                            allowClear
                            mode="multiple"
                            maxTagCount="responsive"
                            options={countries?.map((country) => ({
                                label: country.displayName,
                                value: country.isoName
                            }))}
                            filterOption={(input, option) =>
                                (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA.label as string).localeCompare(optionB.label as string)
                            }
                        />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item name={["externalPlaylist", "description"]} label="Description">
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
