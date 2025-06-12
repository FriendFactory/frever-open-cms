import React, { useState } from "react";
import { DatePickerProps, InputProps, SelectProps, Typography } from "antd";
import styled from "styled-components";

import { EditableCellInput } from "./EditableCellInput";
import { EditableCellSelect } from "./EditableCellSelect";
import { EditableCellDate } from "./EditableCellDate";
import { ItemKey } from "../EditableTable/EditableTable";
import { EditableCellCustom } from "./EditableCellCustom";

export type EditableCellFieldProps<T = any> =
    | ({ type: "string" | "number" } & Omit<InputProps, "type">)
    | ({ type: "select" | "boolean" } & SelectProps)
    | ({ type: "date" } & DatePickerProps)
    | { type: "custom-field"; render: (values: T, save: (newValues: Partial<T>) => void) => React.ReactNode };

export interface EditableCellProps<T = any> {
    title: React.ReactNode;
    children: React.ReactNode;
    editableCellProps?: EditableCellFieldProps<T>;
    dataIndex: keyof T;
    record?: T;
    onSave: (changes: Partial<T>, sourceValue: T) => void;
    error?: string;
    disabled?: boolean;
}

export function EditableCell<T extends { id: ItemKey }>({
    title,
    children,
    dataIndex,
    record,
    editableCellProps,
    onSave,
    error,
    disabled,
    ...restProps
}: EditableCellProps) {
    const [editing, setEditing] = useState(false);

    const toggleEdit = () => setEditing(!editing);

    const value = record?.[dataIndex];

    const handleOnSave = (newValue: T[keyof T]) => {
        toggleEdit();

        if (newValue != value) {
            onSave({ [dataIndex]: newValue }, record);
        }
    };

    const handleOnSaveCustomField = (newValues: Partial<T>) => {
        toggleEdit();
        onSave(newValues, record);
    };

    let childNode = children;

    if (!!editableCellProps && !disabled) {
        if (!editing) {
            childNode = (
                <div className="editable-cell-value-wrap" onClick={toggleEdit}>
                    {children}
                </div>
            );
        } else {
            const props = {
                ...editableCellProps,
                defaultValue: value,
                onSave: handleOnSave
            };

            childNode =
                props.type === "select" || props.type === "boolean" ? (
                    <EditableCellSelect {...props} />
                ) : props.type === "date" ? (
                    <EditableCellDate {...props} />
                ) : props.type === "string" || props.type === "number" ? (
                    <EditableCellInput {...props} type={props.type as "string"} />
                ) : props.type === "custom-field" ? (
                    <EditableCellCustom toggler={setEditing}>
                        {props.render(record, handleOnSaveCustomField)}
                    </EditableCellCustom>
                ) : null;
        }
    }
    return (
        <td {...restProps}>
            {childNode}
            {error && (
                <ErrorWrapper>
                    <Typography.Text className="error" type="danger">
                        {error}
                    </Typography.Text>
                </ErrorWrapper>
            )}
        </td>
    );
}

const ErrorWrapper = styled.div`
    padding-left: 12px;
    font-size: 12px;
`;
