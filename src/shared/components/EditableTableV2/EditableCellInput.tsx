import React from "react";
import { Input, InputProps } from "antd";

type InputEventType = React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement, Element>;

export type EditableCellInputProps = Omit<InputProps, "type"> & { type: "string" | "number" } & {
    onSave: (value: any) => void;
};

export function EditableCellInput({ onSave, type, ...props }: EditableCellInputProps) {
    const handleOnSave = (event: InputEventType) => {
        const { value } = event.currentTarget;
        let result = value === undefined || value === "" ? null : value;
        onSave(result);
    };

    return (
        <Input
            {...props}
            type={type === "string" ? "text" : "number"}
            autoFocus
            onPressEnter={handleOnSave}
            onBlur={handleOnSave}
        />
    );
}
