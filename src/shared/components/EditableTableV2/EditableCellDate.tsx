import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

export type EditableCellDateProps = {
    type: "date";
    defaultValue: string;
    onSave: (value: any) => void;
} & DatePickerProps;

export function EditableCellDate({ onSave, defaultValue, ...rest }: EditableCellDateProps) {
    const value = defaultValue ? dayjs.utc(defaultValue) : undefined;

    const handleOk = (newValue: Dayjs) => onSave(dayjs(newValue).toString());

    const handleOnBlur = () => onSave(defaultValue);

    return <DatePicker {...rest} autoFocus open defaultValue={value} onOk={handleOk} onBlur={handleOnBlur} />;
}
