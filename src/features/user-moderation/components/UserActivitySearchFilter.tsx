import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form/Form";
import { DefaultOptionType } from "antd/es/select";

import { UserActivityFilterName, UserActivityQueryParams } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";

interface UserActivitySearchFilterProps {
    form: FormInstance<UserActivityQueryParams>;
    values?: UserActivityQueryParams;
    actionTypes?: DefaultOptionType[];
    onSearch: () => void;
    changeSortDirection: () => void;
}

export function UserActivitySearchFilter({
    form,
    values,
    actionTypes,
    onSearch,
    changeSortDirection
}: UserActivitySearchFilterProps) {
    return (
        <Form layout="horizontal" form={form} initialValues={values}>
            <Row gutter={[24, 0]}>
                {inputFields.map(({ name, label }) => (
                    <Col flex="1 0 220px" key={name}>
                        <Form.Item name={name} label={label}>
                            <Input onPressEnter={onSearch} />
                        </Form.Item>
                    </Col>
                ))}

                <Col flex="auto">
                    <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                        Search
                    </Button>
                </Col>

                <Col flex="0 0 400px">
                    <Form.Item name="actionType" label="Action Type">
                        <Select allowClear options={actionTypes} onChange={onSearch} />
                    </Form.Item>
                </Col>

                <ColAlignRight flex="290px">
                    <Row gutter={[8, 16]} wrap={false} align={{ xs: "bottom" }} justify={{ xs: "start", sm: "end" }}>
                        <Col flex="0 0 220px">
                            <Form.Item label="Sort by" name="orderBy">
                                <Select value={values?.orderBy} onChange={onSearch}>
                                    <Select.Option value="occurredAt">Occurred At</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="40px">
                            <Form.Item shouldUpdate name="sortDirection">
                                <Button
                                    type="default"
                                    icon={
                                        values?.sortDirection === "asc" ? (
                                            <SortAscendingOutlined />
                                        ) : (
                                            <SortDescendingOutlined />
                                        )
                                    }
                                    onClick={changeSortDirection}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </ColAlignRight>
            </Row>
        </Form>
    );
}

const inputFields: Array<{ name: UserActivityFilterName; label: string }> = [
    { name: "refVideoId", label: "Video ID" },
    { name: "refTaskId", label: "Task ID" },
    { name: "refLevelId", label: "Level ID" },
    { name: "refGroupId", label: "Group ID" },
    { name: "refActorGroupId", label: "Actor ID" },
    { name: "seasonId", label: "Season ID" }
];
