import { Select, SelectProps } from "antd";
import React from "react";

export type EditableCellSelectProps = SelectProps & {
    type: "select" | "boolean";
    onSave: (value: any) => void;
};

export function EditableCellSelect({ onSave, type, ...rest }: EditableCellSelectProps) {
    const handleOnBlur = () => onSave(rest.defaultValue);
    const defaultValue = rest.mode === "multiple" && rest.defaultValue === null ? undefined : rest.defaultValue;

    return (
        <Select
            style={{ width: "100%" }}
            options={type === "boolean" && (booleanOptions as any)}
            {...rest}
            defaultValue={defaultValue}
            autoFocus
            open
            onChange={onSave}
            onBlur={handleOnBlur}
        />
    );
}

const booleanOptions = [
    { label: "True", value: true },
    { label: "False", value: false }
];
