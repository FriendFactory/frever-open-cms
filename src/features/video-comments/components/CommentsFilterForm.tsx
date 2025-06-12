import React, { useCallback } from "react";
import { Row, Col, Button, Input, Form, DatePicker, Select, Checkbox, Radio, RadioChangeEvent } from "antd";
import { Dayjs } from "dayjs";
import { VideoCommentsQueryParams } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";

const { RangePicker } = DatePicker;
const { Option } = Select;

const allowEmpty: [boolean, boolean] = [true, true];

export interface CommentFilterFormInitialValues extends Omit<VideoCommentsQueryParams, "time"> {
    time?: [Dayjs, Dayjs];
}

export interface CommentsFilterProps {
    values: CommentFilterFormInitialValues;
    onChange: (newValues: CommentFilterFormInitialValues) => void;

    withGroupFilter?: boolean;
    withVideoFilter?: boolean;
}

export function CommentsFilterForm({ values, onChange, withGroupFilter, withVideoFilter }: CommentsFilterProps) {
    const handleChangeStatus = useCallback(
        (event: RadioChangeEvent) => {
            const newValue: CommentFilterFormInitialValues = { ...values, isDeleted: event.target.value };
            onChange(newValue);
        },
        [onChange, values]
    );
    return (
        <Form initialValues={values} onFinish={onChange}>
            <Row align="bottom" gutter={24}>
                {withGroupFilter && (
                    <Col flex="1 0 270px">
                        <Form.Item name="group" label="Group">
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                {withVideoFilter && (
                    <Col flex="1 0 270px">
                        <Form.Item name="videoId" label="Video ID">
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                <Col flex="1 0 390px">
                    <Form.Item name="time" label="Date range">
                        <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 640px">
                    <Row gutter={8}>
                        <Col flex="1 0 200px">
                            <Form.Item name="filter" label="Content">
                                <Select>
                                    <Option value="contains">Contains</Option>
                                    <Option value="eq">Equals</Option>
                                    <Option value="startswith">Starts with</Option>
                                    <Option value="endswith">Ends with</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 290px">
                            <Form.Item name="text">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="caseSensitive" valuePropName="checked">
                                <Checkbox>Case sensitive</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <ColAlignRight>
                    <Form.Item name="isDeleted">
                        <Radio.Group onChange={handleChangeStatus}>
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
