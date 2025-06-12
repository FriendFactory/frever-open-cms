import React from "react";
import { Row, Col, Button, Input, Form, DatePicker, Select, Checkbox, Radio, FormInstance } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";

import { createOptionsExtraBundle, useExtraDataBundle } from "shared";
import { UserSearchFieldContainer } from "shared/containers/UserSearchFieldContainer";

const { RangePicker } = DatePicker;
const { Option } = Select;

const allowEmpty: [boolean, boolean] = [true, true];
export interface CharacterFilterFormParams {
    skip?: number;
    name?: string;
    filter?: "contains" | "eq" | "startswith" | "endswith";
    caseSensitive?: string;
    id?: string;
    groupId?: string;
    createdTime?: [Dayjs, Dayjs];
    modifiedTime?: [Dayjs, Dayjs];
    publicForCreation?: "true" | "false";
    publicForBackgroundDancing?: "true" | "false";
    isDeleted?: "true" | "false";

    ignoreGroupId?: number;
    readinessId?: number;
}

export interface CharacterListFilterFormProps {
    form: FormInstance<CharacterFilterFormParams>;
    values: CharacterFilterFormParams;
    onSearch: () => void;
}

export function CharacterListFilterForm({ form, values, onSearch }: CharacterListFilterFormProps) {
    const { bundle, loading } = useExtraDataBundle(["Gender"]);

    return (
        <Form form={form} initialValues={values} onFinish={onSearch} layout="horizontal">
            <Row align="bottom" gutter={24}>
                <Col flex="1 0 190px">
                    <Form.Item name="id" label="ID">
                        <Input name="id" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 640px">
                    <Row gutter={8}>
                        <Col flex="1 0 200px">
                            <Form.Item name="filter" label="Name">
                                <Select>
                                    <Option value="contains">Contains</Option>
                                    <Option value="eq">Equals</Option>
                                    <Option value="startswith">Starts with</Option>
                                    <Option value="endswith">Ends with</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 290px">
                            <Form.Item name="name">
                                <Input.Search type="search" name="name" placeholder="Input keywords here" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="caseSensitive" valuePropName="checked">
                                <Checkbox name="caseSensitive">Case sensitive</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>

                <Col flex="1 0 240px">
                    <Form.Item name="groupId" label="User">
                        <UserSearchFieldContainer />
                    </Form.Item>
                </Col>

                <Col flex="1 0 390px">
                    <Form.Item name="createdTime" label="Created date">
                        <RangePicker style={{ width: "100%" }} name="createdTime" allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 390px">
                    <Form.Item name="modifiedTime" label="Modified date">
                        <RangePicker style={{ width: "100%" }} name="modifiedTime" allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>

                <Col flex="250px">
                    <Form.Item label="Gender" name="genderId">
                        <Select
                            allowClear
                            maxTagCount="responsive"
                            mode="multiple"
                            options={createOptionsExtraBundle("Gender", bundle, (data) => ({
                                label: data.name,
                                value: data.id.toString()
                            }))}
                            onChange={onSearch}
                            loading={loading}
                        />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button htmlType="submit" icon={<SearchOutlined />} type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <Col>
                    <Row gutter={24}>
                        <Col>
                            <Form.Item label="Public For Creation" name="publicForCreation">
                                <Radio.Group value={values.publicForCreation} onChange={onSearch}>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="Public For Background Dancing" name="publicForBackgroundDancing">
                                <Radio.Group value={values.publicForBackgroundDancing} onChange={onSearch}>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isDeleted">
                                <Radio.Group value={values.isDeleted} onChange={onSearch}>
                                    <Radio.Button value={"true"}>Deleted</Radio.Button>
                                    <Radio.Button value={"false"}>Active</Radio.Button>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
}
