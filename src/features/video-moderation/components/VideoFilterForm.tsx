import React, { useCallback } from "react";
import { SearchOutlined, SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Radio, RadioChangeEvent, Row, Select } from "antd";
import { Dayjs } from "dayjs";

import { GetVideoListParams, videoAccess } from "../services";
import { ColAlignRight } from "shared/components/ColAlignRight";
import { UserSearchFieldContainer } from "shared/containers/UserSearchFieldContainer";
import { Country, Language, selectFilterProps } from "shared";

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface VideoFilterFields extends Omit<GetVideoListParams, "skip" | "date"> {
    date?: [Dayjs, Dayjs];
    video?: string;
}

export interface VideoFilterProps {
    value: VideoFilterFields;
    onChange: (newValues: VideoFilterFields) => void;
    countries?: Country[];
    languages?: Language[];
}

const allowEmpty: [boolean, boolean] = [true, true];

export function VideoFilterForm({ value, onChange, countries, languages }: VideoFilterProps) {
    const handleChangeFilter = useCallback(
        (name: "remixedFromVideoId" | "isFeatured" | "fromTask" | "fromTemplate" | "hasLevel") =>
            (event: RadioChangeEvent) =>
                onChange({ ...value, [name]: event.target.value }),
        [onChange, value]
    );

    const handleChangeFilterAccess = (key: "access" | "country" | "language") => (val: any) =>
        onChange({ ...value, [key]: val });

    const handleFilterOriginal = useCallback(
        (event: RadioChangeEvent) => {
            const bool = event.target.value === "true" ? "false" : event.target.value === "false" ? "true" : undefined;

            const newValue: VideoFilterFields = {
                ...value,
                fromTemplate: bool,
                remixedFromVideoId: bool
            };
            onChange(newValue);
        },
        [onChange, value]
    );

    const handleSortingChange = useCallback(
        (newValue: GetVideoListParams["orderBy"]) => {
            onChange({
                ...value,
                orderBy: newValue
            });
        },
        [value, onChange]
    );

    const handleSortDirectionChange = useCallback(() => {
        const newDirection = value.sortDirection === "asc" || !value.sortDirection ? "desc" : "asc";
        onChange({
            ...value,
            sortDirection: newDirection
        });
    }, [value, onChange]);

    return (
        <Form layout="horizontal" initialValues={value} onFinish={onChange}>
            <Row gutter={24}>
                <Col flex="1 0 250px">
                    <Form.Item name="video" label="Video">
                        <Input placeholder="ID or ID list" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 250px">
                    <Form.Item name="group" label="User">
                        <UserSearchFieldContainer />
                    </Form.Item>
                </Col>
                <Col flex="1 0 200px">
                    <Form.Item name="hashtag" label="Hashtag">
                        <Input placeholder="Name" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 160px">
                    <Form.Item name="templateId" label="Template">
                        <Input placeholder="ID" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 160px">
                    <Form.Item name="level" label="Level">
                        <Input placeholder="ID" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 160px">
                    <Form.Item name="schoolTaskId" label="Task">
                        <Input placeholder="ID" />
                    </Form.Item>
                </Col>
                <Col flex="1 0 250px">
                    <Form.Item name="description" label="Description">
                        <Input placeholder="Text" />
                    </Form.Item>
                </Col>

                <Col flex="1 0 300px">
                    <Form.Item name="date" label="Date">
                        <RangePicker style={{ width: "100%" }} name="date" allowEmpty={allowEmpty} />
                    </Form.Item>
                </Col>
                <Col flex="1 0 131px">
                    <Form.Item>
                        <Button type="primary" ghost htmlType="submit" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <Col flex="1 0 230px">
                    <Form.Item label="Access" name="access">
                        <Select
                            allowClear
                            onChange={handleChangeFilterAccess("access")}
                            options={videoAccess.map((val) => ({ value: val.id, label: val.name }))}
                        />
                    </Form.Item>
                </Col>
                <Col flex="1 0 340px">
                    <Form.Item name="country" label="Country">
                        <Select
                            {...selectFilterProps}
                            defaultValue={value.country}
                            onChange={handleChangeFilterAccess("country")}
                            showSearch
                            allowClear
                            options={countries?.map((el) => ({ label: el.displayName, value: el.isoName }))}
                        />
                    </Form.Item>
                </Col>
                <Col flex="1 0 340px">
                    <Form.Item name="language" label="Language">
                        <Select
                            {...selectFilterProps}
                            defaultValue={value.language}
                            onChange={handleChangeFilterAccess("language")}
                            showSearch
                            allowClear
                            options={languages?.map((el) => ({ label: el.name, value: el.isoCode }))}
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item label="Remixed">
                        <Radio.Group
                            value={value.remixedFromVideoId}
                            onChange={handleChangeFilter("remixedFromVideoId")}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="Featured">
                        <Radio.Group value={value.isFeatured} onChange={handleChangeFilter("isFeatured")}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="From Template">
                        <Radio.Group value={value.fromTemplate} onChange={handleChangeFilter("fromTemplate")}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="Original">
                        <Radio.Group onChange={handleFilterOriginal}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="Level">
                        <Radio.Group value={value.hasLevel} onChange={handleChangeFilter("hasLevel")}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item label="From Task">
                        <Radio.Group value={value.fromTask} onChange={handleChangeFilter("fromTask")}>
                            <Radio.Button value="true">Yes</Radio.Button>
                            <Radio.Button value="false">No</Radio.Button>
                            <Radio.Button>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <ColAlignRight flex="280px">
                    <Row gutter={[8, 16]} wrap={false} align={{ xs: "bottom" }} justify={{ xs: "start", sm: "end" }}>
                        <Col flex="220px">
                            <Form.Item label="Sort by">
                                <Select value={value.orderBy} onChange={handleSortingChange}>
                                    <Option value="createdTime">Created Time</Option>
                                    <Option value="id">ID</Option>
                                    <Option value="groupId">Group ID</Option>
                                    <Option value="groupNickName">Group Nickname</Option>
                                    <Option value="">{"<Default>"}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="32px">
                            <Form.Item>
                                <Button
                                    type="default"
                                    icon={
                                        value.sortDirection === "desc" ? (
                                            <SortDescendingOutlined />
                                        ) : (
                                            <SortAscendingOutlined />
                                        )
                                    }
                                    onClick={handleSortDirectionChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </ColAlignRight>
            </Row>
        </Form>
    );
}
