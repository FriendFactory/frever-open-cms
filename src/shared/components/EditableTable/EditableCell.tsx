import React from "react";
import {
    Checkbox,
    CheckboxProps,
    DatePicker,
    DatePickerProps,
    Form,
    Input,
    InputProps,
    Select,
    SelectProps
} from "antd";
import { TextAreaProps } from "antd/es/input";
import { Dayjs } from "dayjs";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    children: React.ReactNode;
    record: unknown;
    index: number;
    editableCellProps?: { pathname?: string } & (
        | (CheckboxProps & { type: "checkbox" })
        | InputProps
        | (TextAreaProps & { type: "textarea" })
        | (DatePickerProps & { type: "date" })
        | (Omit<SelectProps, "options"> & { options: SelectProps["options"] })
    );
}

export function EditableCell({
    editing,
    dataIndex,
    children,
    title,
    record,
    index,
    editableCellProps,
    ...restProps
}: EditableCellProps) {
    const form = Form.useFormInstance();

    const onDataChange = (value: Dayjs | null, _: string) => {
        form.setFieldValue(dataIndex, value?.utc().format());
    };

    const item =
        editableCellProps && "options" in editableCellProps ? (
            <Select {...editableCellProps} />
        ) : editableCellProps?.type === "checkbox" ? (
            <Checkbox {...(editableCellProps as CheckboxProps)} />
        ) : editableCellProps?.type === "textarea" ? (
            <Input.TextArea {...(editableCellProps as TextAreaProps)} />
        ) : editableCellProps?.type === "date" ? (
            <DatePicker {...(editableCellProps as DatePickerProps)} style={{ width: "100%" }} onChange={onDataChange} />
        ) : (
            <Input {...(editableCellProps as InputProps)} />
        );
    return (
        <td {...restProps}>
            {editing && !editableCellProps?.disabled ? (
                <Form.Item
                    name={editableCellProps?.pathname ?? dataIndex}
                    style={{ margin: "0 0 0 -12px" }}
                    required
                    {...((editableCellProps as InputProps).type === "checkbox" ? { valuePropName: "checked" } : {})}
                    {...((editableCellProps as DatePickerProps & { type: "date" }).type === "date"
                        ? { valuePropName: "date" }
                        : {})}>
                    {item}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
}
