import React, { useCallback } from "react";
import { DatePicker, Radio, RadioChangeEvent, Select, Space } from "antd";
import { Dayjs } from "dayjs";

import { GetLeaderboardListParams } from "../services";

const { Option } = Select;

export interface LeaderboardFilterValues extends Omit<GetLeaderboardListParams, "dateRange" | "skip" | "top"> {
    dateRange?: [Dayjs, Dayjs];
}

export interface LeaderboardFilterProps {
    values: LeaderboardFilterValues;
    handleChange: (value: LeaderboardFilterValues) => void;
}

export function LeaderboardFilter({ values, handleChange }: LeaderboardFilterProps) {
    const handleOnChange = useCallback(
        (fieldName: keyof LeaderboardFilterValues) =>
            (value: Required<LeaderboardFilterValues[keyof LeaderboardFilterValues]>) =>
                handleChange({ ...values, [fieldName]: value }),
        [values]
    );

    const handleChangeFeatured = useCallback(
        (event: RadioChangeEvent) => handleChange({ ...values, isFeatured: event.target.value }),
        [values]
    );
    return (
        <Space size="large" wrap>
            <Space>
                Top by:
                <Select
                    style={{ width: "220px" }}
                    value={values.propertyName}
                    onChange={handleOnChange("propertyName")}>
                    <Option value="videoLikesCount">Video Likes</Option>
                    <Option value="followersCount">Followers</Option>
                    <Option value="totalLevelsCount">Levels</Option>
                    <Option value="totalVideoCount">Videos</Option>
                </Select>
            </Space>

            <Space>
                Date range:
                <DatePicker.RangePicker
                    allowClear
                    value={values.dateRange}
                    onChange={handleOnChange("dateRange") as any}
                />
            </Space>

            <Space style={{ marginLeft: "auto" }}>
                Featured:
                <Radio.Group defaultValue={values.isFeatured} onChange={handleChangeFeatured}>
                    <Radio.Button value={undefined}>All</Radio.Button>
                    <Radio.Button value={"true"}>Yes</Radio.Button>
                    <Radio.Button value={"false"}>No</Radio.Button>
                </Radio.Group>
            </Space>
        </Space>
    );
}
