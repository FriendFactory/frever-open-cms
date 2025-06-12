import React, { useState } from "react";
import { Button, DatePicker, Select, Space } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { RangeValue } from "rc-picker/lib/interface";
import dayjs, { Dayjs } from "dayjs";

import { CharacterBakedViewStatistics, CharactersBakingQueryParams } from "../services";

const { RangePicker } = DatePicker;

const EMPTY_DATES: CharacterBakingFormQueryParams = { startDate: undefined, endDate: undefined };

export interface CharacterBakingFormQueryParams extends Omit<CharactersBakingQueryParams, "startDate" | "endDate"> {
    startDate?: Dayjs;
    endDate?: Dayjs;
}

type RangeTypes = "1h" | "3h" | "12h" | "1d" | "3d" | "7d" | "custom";

interface CharactersBakingFilterProps {
    charactersBaking?: CharacterBakedViewStatistics;
    onChangeFilter: (query: CharacterBakingFormQueryParams) => void;
}

export function CharactersBakingFilter({ charactersBaking, onChangeFilter }: CharactersBakingFilterProps) {
    const [selectedRange, setSelectedRange] = useState<RangeTypes | null>(null);
    const [currentQuery, setCurrentQuery] = useState<CharacterBakingFormQueryParams | null>(null);

    const updateQuery = (newQuery: Partial<typeof currentQuery>) => {
        const updatedQuery = { ...currentQuery, ...newQuery };
        setCurrentQuery(updatedQuery);
        onChangeFilter(updatedQuery);
    };

    const handleButtonClick = (range: RangeTypes) => () => {
        if (selectedRange === range && range !== "custom") {
            setSelectedRange(null);
            updateQuery(EMPTY_DATES);
            return;
        }

        if (range !== "custom") {
            const startDate = getStartDate(range);
            const endDate = dayjs();

            if (startDate) {
                updateQuery({ startDate: startDate.utc(), endDate: endDate.utc() });
            }
        }

        setSelectedRange(range);
    };

    const handleRangeChange = (dates: RangeValue<Dayjs> | null) => {
        if (dates) {
            const [start, end] = dates as [Dayjs, Dayjs];
            updateQuery({ startDate: start.utc(), endDate: end.utc() });
        } else {
            setSelectedRange(null);
            updateQuery(EMPTY_DATES);
        }
    };

    const handleAgentChange = (agentName: string | undefined) => {
        updateQuery({ agentName });
    };

    return (
        <Space.Compact>
            <Select
                style={{ width: 200 }}
                allowClear
                options={[...new Set(charactersBaking?.bakingMachineAgentNames)].map((agentName) => ({
                    label: agentName,
                    value: agentName
                }))}
                onChange={handleAgentChange}
            />

            {(["1h", "3h", "12h", "1d", "3d", "7d"] as const).map((range) => (
                <Button
                    key={range}
                    type={selectedRange === range ? "primary" : "default"}
                    onClick={handleButtonClick(range)}>
                    {range}
                </Button>
            ))}
            {selectedRange != "custom" ? (
                <Button type={"default"} onClick={handleButtonClick("custom")} icon={<CalendarOutlined />} />
            ) : (
                <RangePicker
                    style={{ width: 230 }}
                    onChange={handleRangeChange}
                    placeholder={["Start Date", "End Date"]}
                    onClick={handleButtonClick("custom")}
                />
            )}
        </Space.Compact>
    );
}

const getStartDate = (range: RangeTypes): Dayjs | null => {
    const now = dayjs();
    switch (range) {
        case "1h":
            return now.subtract(1, "hour");
        case "3h":
            return now.subtract(3, "hour");
        case "12h":
            return now.subtract(12, "hour");
        case "1d":
            return now.subtract(1, "day");
        case "3d":
            return now.subtract(3, "day");
        case "7d":
            return now.subtract(7, "day");
        default:
            return null;
    }
};
