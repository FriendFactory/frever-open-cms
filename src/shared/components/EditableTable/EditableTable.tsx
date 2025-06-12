import React, { useCallback, useState } from "react";
import { Form, Table } from "antd";
import { ColumnType, TableProps } from "antd/lib/table";

import { EditableCell, EditableCellProps } from "./EditableCell";
import { actionColumnRender as actionColumnDefaultRender } from "./ActionColumnRender";

export type ItemKey = string | number;

export type ActionColumnRenderProps<T> = {
    item: T;
    isEditing: boolean;
    onCancel: () => void;
    onEdit: (item: T) => void;
    onSave: (itemKey: ItemKey) => void;
    extra?: (item: T) => React.ReactNode;
};

export type ActionColumnProps<T = any> = {
    render?: (props: ActionColumnRenderProps<T>) => React.ReactNode;
} & Omit<ColumnType<T>, "render">;

export interface EditableTableColumn<T = any> extends ColumnType<T> {
    editableCellProps?:
        | ((record: T) => EditableCellProps["editableCellProps"])
        | EditableCellProps["editableCellProps"];
    hidden?: boolean;
}
export interface EditableTableProps<T = any> extends Omit<TableProps<T>, "columns"> {
    columns?: EditableTableColumn[];
    onFinish: (data: T, sourceValue: T) => void;
    actionColumnProps?: ActionColumnProps<T>;
}

export const EditableTable = <T extends { id: ItemKey }>({
    onFinish,
    actionColumnProps,
    columns = [],
    ...restProps
}: EditableTableProps<T>) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState<ItemKey | null>(null);

    const isEditing = useCallback((record: T) => record.id === editingKey, [editingKey]);

    const onCancel = useCallback(() => {
        setEditingKey(null);
        form.resetFields();
    }, []);

    const onEdit = useCallback(
        (record: T) => {
            form.resetFields();
            form.setFieldsValue({ ...record });
            setEditingKey(record.id);
        },
        [form]
    );

    const onSave = useCallback(
        async (key: number | string) => {
            const row = await form.validateFields();
            const sourceValue = restProps.dataSource?.find((el) => el.id === key);

            onFinish({ id: key, ...row }, sourceValue!);
            setEditingKey(null);
            form.resetFields();
        },
        [form, restProps.dataSource, onFinish]
    );

    const renderFunction = actionColumnProps?.render || actionColumnDefaultRender;

    const renderActionColumn = (_: any, item: any) =>
        renderFunction({
            item,
            isEditing: isEditing(item),
            onSave,
            onCancel,
            onEdit
        });

    const mergedColumns: EditableTableColumn[] = [
        ...columns
            .filter((col) => !col.hidden)
            .map((col: any) => {
                if (!col.editableCellProps) return col;

                return {
                    ...col,
                    onCell: (record: T) => ({
                        record,
                        editing: isEditing(record),
                        dataIndex: col.dataIndex,
                        editableCellProps:
                            typeof col.editableCellProps === "function"
                                ? col.editableCellProps(record)
                                : col.editableCellProps
                    })
                };
            }),
        {
            title: "",
            fixed: "right",
            align: "right",
            width: 104,
            ...actionColumnProps,
            render: renderActionColumn
        }
    ];

    return (
        <Form form={form} component={false}>
            <Table
                sticky
                pagination={{ defaultPageSize: 50 }}
                scroll={{ x: 500 }}
                rowKey={getRowKey}
                components={{ body: { cell: EditableCell } }}
                columns={mergedColumns}
                {...restProps}
                onRow={editingKey ? undefined : restProps?.onRow}
            />
        </Form>
    );
};

const getRowKey = (data: { id: ItemKey }) => data.id;
