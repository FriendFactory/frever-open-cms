import React from "react";
import { Row, Col, Button, Input, Form, DatePicker, Select, Checkbox, Radio, RadioChangeEvent } from "antd";
import { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

import { SortingModeDrowdown } from "../SortingModeDrowdown";
import { TemplateCategory } from "shared";
import { UserSearchFieldContainer } from "shared/containers/UserSearchFieldContainer";
import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;
const { Option } = Select;

const allowEmpty: [boolean, boolean] = [true, true];
export interface TemplateFilterFormParams {
    id?: number;
    title?: string;
    filter?: "contains" | "eq" | "startswith" | "endswith";
    caseSensitive?: boolean;
    creatorId?: number;
    eventId?: number;
    characterCount?: number;
    createdTime?: [Dayjs, Dayjs];
    modifiedTime?: [Dayjs, Dayjs];
    isDeleted?: "true" | "false";
    templateCategory?: number;
    categoryId?: number;
}

export interface TemplateListFilterFormProps {
    stage?: string;
    values: TemplateFilterFormParams;
    templateCategories?: TemplateCategory[];
    onChange: (form: TemplateFilterFormParams) => void;
}

export function TemplateListFilterForm({ stage, values, templateCategories, onChange }: TemplateListFilterFormProps) {
    const filterTemplateList = (event: RadioChangeEvent) => onChange({ ...values, isDeleted: event.target.value });

    const filterTemplateByCategory = (id?: number) => onChange({ ...values, categoryId: id });

    return (
        <Form initialValues={values} onFinish={onChange} layout="horizontal">
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
                            <Form.Item name="title">
                                <Input name="tempName" placeholder="Input keywords here" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="caseSensitive" valuePropName="checked">
                                <Checkbox name="caseSensitive">Case sensitive</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col flex="1 0 250px">
                    <Form.Item name="creatorId" label="Creator">
                        <UserSearchFieldContainer />
                    </Form.Item>
                </Col>
                <Col flex="1 0 240px">
                    <Form.Item name="eventId" label="Event ID">
                        <Input name="eventId" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 340px">
                    <Form.Item name="createdTime" label="Created">
                        <RangePicker style={{ width: "100%" }} name="createdTime" allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 340px">
                    <Form.Item name="modifiedTime" label="Modified">
                        <RangePicker style={{ width: "100%" }} name="modifiedTime" allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 255px">
                    <Form.Item name="characterCount" label="Character Count">
                        <Input name="characterCount" type="number" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 240px">
                    <Form.Item name="categoryId" label="Category">
                        <Select allowClear onChange={filterTemplateByCategory}>
                            {templateCategories?.map((el) => (
                                <Select.Option key={el.id} value={el.id}>
                                    {el.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button htmlType="submit" ghost type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <ColAlignRight>
                    <Row gutter={[8, 16]}>
                        <Col>
                            <Form.Item name="isDeleted">
                                <Radio.Group name="isDeleted" onChange={filterTemplateList}>
                                    <Radio.Button value={undefined} name="isDeleted">
                                        All
                                    </Radio.Button>
                                    <Radio.Button value="true" name="isDeleted">
                                        Active
                                    </Radio.Button>
                                    <Radio.Button value="false" name="isDeleted">
                                        Deleted
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        {stage && (
                            <Col>
                                <SortingModeDrowdown stage={stage} />
                            </Col>
                        )}
                    </Row>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
