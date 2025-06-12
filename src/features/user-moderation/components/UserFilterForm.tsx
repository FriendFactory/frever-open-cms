import React, { useCallback } from "react";
import { Row, Col, Button, Input, Form, DatePicker, Select, Checkbox, Radio, RadioChangeEvent } from "antd";
import { Dayjs } from "dayjs";

import { GetUserListParams } from "../services";
import { Country, Language, selectFilterProps } from "shared";

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface UserFilterFields extends Omit<GetUserListParams, "date"> {
    date?: [Dayjs, Dayjs];
}

export interface UserFilterProps {
    value: UserFilterFields;
    onChange: (newValues: UserFilterFields) => void;
    languages?: Language[];
    countries?: Country[];
}

const allowEmpty: [boolean, boolean] = [true, true];

export function UserFilterForm({ value, languages, countries, onChange }: UserFilterProps) {
    const handleSubmit = useCallback(
        (newValues: UserFilterFields) => {
            onChange(newValues);
        },
        [onChange, value]
    );

    const handleChangeUserState =
        (fieldName: "isDeleted" | "isBlocked" | "isFeatured" | "isOnWatchList" | "isTemporary") =>
        (event: RadioChangeEvent) => {
            onChange({ ...value, [fieldName]: event.target.value });
        };

    return (
        <Form initialValues={value} onFinish={handleSubmit} layout="horizontal">
            <Row align="bottom" gutter={24}>
                <Col flex="1 0 220px">
                    <Form.Item name="id" label="ID">
                        <Input name="id" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 230px">
                    <Form.Item name="nickname" label="Nickname">
                        <Input name="nickname" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 640px">
                    <Row gutter={8}>
                        <Col flex="1 0 200px">
                            <Form.Item name="filter" label="Email/Phone">
                                <Select>
                                    <Option value="contains">Contains</Option>
                                    <Option value="eq">Equals</Option>
                                    <Option value="startswith">Starts with</Option>
                                    <Option value="endswith">Ends with</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 290px">
                            <Form.Item name="emailOrPhone">
                                <Input name="emailOrPhone" placeholder="Input keywords here" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="caseSensitive" valuePropName="checked">
                                <Checkbox name="caseSensitive">Case sensitive</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>

                <Col flex="1 0 320px">
                    <Form.Item name="authId" label="AppleID/GoogleID">
                        <Input autoComplete="off" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 320px">
                    <Form.Item name="mainGroupId" label="Group ID">
                        <Input name="mainGroupId" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 340px">
                    <Form.Item name="date" label="Created">
                        <RangePicker style={{ width: "100%" }} name="date" allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>

                <Col flex="1 0 340px">
                    <Form.Item name="country" label="Country">
                        <Select
                            allowClear
                            mode="multiple"
                            options={countries?.map((el) => ({ label: el.displayName, value: String(el.id) }))}
                            {...selectFilterProps}
                        />
                    </Form.Item>
                </Col>

                <Col flex="1 0 340px">
                    <Form.Item name="language" label="Language">
                        <Select
                            allowClear
                            mode="multiple"
                            options={languages?.map((el) => ({ label: el.name, value: String(el.id) }))}
                            {...selectFilterProps}
                        />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <Col flex="1 0 auto">
                    <Row gutter={16}>
                        <Col>
                            <Form.Item name="isBlocked" label="Is Blocked">
                                <Radio.Group onChange={handleChangeUserState("isBlocked")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isDeleted" label="Is Deleted">
                                <Radio.Group onChange={handleChangeUserState("isDeleted")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isFeatured" label="Is Featured">
                                <Radio.Group onChange={handleChangeUserState("isFeatured")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isTemporary" label="Is Temporary">
                                <Radio.Group onChange={handleChangeUserState("isTemporary")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="isOnWatchList" label="Watchlisted">
                                <Radio.Group onChange={handleChangeUserState("isOnWatchList")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value={"true"}>Yes</Radio.Button>
                                    <Radio.Button value={"false"}>No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
}
