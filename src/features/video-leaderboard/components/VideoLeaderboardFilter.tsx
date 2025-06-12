import React from "react";
import { Col, DatePicker, Form, Radio, RadioChangeEvent, Row, Select } from "antd";
import { Dayjs } from "dayjs";

import { Country, selectFilterProps } from "shared";
import { VideoLeaderboardQueryParams } from "../services";
import { videoAccess } from "features/video-moderation/services";

const { Option } = Select;

export interface VideoLeaderboardFilterValues extends Omit<VideoLeaderboardQueryParams, "createdTime" | "skip"> {
    createdTime?: [Dayjs, Dayjs];
}

export interface VideoLeaderboardFilterProps {
    values: VideoLeaderboardFilterValues;
    handleOnChangeUrl: (values: VideoLeaderboardFilterValues) => void;
    countries?: Country[];
}

export function VideoLeaderboardFilter({ values, handleOnChangeUrl, countries }: VideoLeaderboardFilterProps) {
    const handleOnChange =
        (fieldName: keyof VideoLeaderboardFilterValues) =>
        (value: Required<VideoLeaderboardFilterValues[keyof VideoLeaderboardFilterValues]>) =>
            handleOnChangeUrl({ ...values, [fieldName]: value });

    const handleChangeRadioGroup = (fieldName: keyof VideoLeaderboardFilterValues) => (event: RadioChangeEvent) =>
        handleOnChangeUrl({ ...values, [fieldName]: event.target.value });

    return (
        <Form initialValues={values} layout="horizontal">
            <Row gutter={24}>
                <Col flex="1 0 240px">
                    <Form.Item name="orderBy" label="Top by">
                        <Select onChange={handleOnChange("orderBy")}>
                            <Option value="views">Views</Option>
                            <Option value="likes">Likes</Option>
                            <Option value="comments">Comments</Option>
                            <Option value="engagementRate">Engagement Rate</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col flex="1 0 230px">
                    <Form.Item name="access" label="Access">
                        <Select
                            onChange={handleOnChange("access")}
                            options={videoAccess.map((val) => ({ value: val.id, label: val.name }))}
                        />
                    </Form.Item>
                </Col>
                <Col flex="1 0 240px">
                    <Form.Item name="editor" label="Editor">
                        <Select onChange={handleOnChange("editor")} allowClear>
                            <Option value="studio">Studio</Option>
                            <Option value="moments">Moments</Option>
                            <Option value="uploaded">Uploaded</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col flex="1 0 340px">
                    <Form.Item name="market" label="Market">
                        <Select
                            {...selectFilterProps}
                            defaultValue={values.market}
                            onChange={handleOnChange("market")}
                            showSearch
                            allowClear
                            options={countries?.map((el) => ({ label: el.displayName, value: el.isoName }))}
                        />
                    </Form.Item>
                </Col>
                <Col flex="1 0 350px">
                    <Form.Item name="createdTime" label="Created Time">
                        <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            allowClear
                            onChange={handleOnChange("createdTime") as any}
                        />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item name="isPremiumMusic" label="Premium Music">
                        <Radio.Group onChange={handleChangeRadioGroup("isPremiumMusic")}>
                            <Radio.Button value={"true"}>Yes</Radio.Button>
                            <Radio.Button value={"false"}>No</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item name="isFeatured" label="Featured">
                        <Radio.Group onChange={handleChangeRadioGroup("isFeatured")}>
                            <Radio.Button value={"true"}>Yes</Radio.Button>
                            <Radio.Button value={"false"}>No</Radio.Button>
                            <Radio.Button value={undefined}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item name="isDeleted" label="Deleted">
                        <Radio.Group onChange={handleChangeRadioGroup("isDeleted")}>
                            <Radio.Button value={"true"}>Yes</Radio.Button>
                            <Radio.Button value={"false"}>No</Radio.Button>
                            <Radio.Button value={"all"}>All</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
