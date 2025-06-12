import React, { useEffect, useState } from "react";
import { Button, Table, Typography, message } from "antd";
import styled from "styled-components";
import { ColumnType, TableProps } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { useVT } from "virtualizedtableforantd4";

import { FixedPageHeader, ItemKey } from "shared";
import { EditableCell, EditableCellFieldProps } from "./EditableCell";

const baseScroll = { x: 4000, y: 700 };

export interface EditableTableV2Column<T = any>
    extends Pick<ColumnType<T>, "align" | "fixed" | "dataIndex" | "render" | "sorter" | "ellipsis"> {
    title?: string | JSX.Element | undefined;
    width?: number;
    editableCellProps?: EditableCellFieldProps<T>;
    validation?: (record: T) => { error?: string; disabled?: boolean } | null;
}

export interface EditableTableV2Props<T> extends Omit<TableProps<T>, "columns" | "dataSource"> {
    dataSource?: T[];
    columns?: EditableTableV2Column<T>[];
    onFinish: (data: Array<Partial<T>>) => void;
}

export function EditableTableV2<T extends { id: ItemKey }>({
    dataSource,
    scroll: defaultScroll,
    columns: defaultColumns,
    onFinish,
    ...tableProps
}: EditableTableV2Props<T>) {
    const scroll = { x: defaultScroll?.x ?? baseScroll.x, y: defaultScroll?.y ?? baseScroll.y };

    const [components, setComponents] = useVT(() => ({ scroll }), [scroll.y, scroll.x]);

    useEffect(() => setComponents({ body: { cell: EditableCell } }));

    const [selectedRowKeys, setSelectedRowKeys] = useState<ItemKey[]>([]);

    const rowSelection: TableRowSelection<T> = {
        onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
        selectedRowKeys,
        fixed: true
    };

    const [hasError, setHasError] = useState<boolean>(false);

    const [changes, setChanges] = useState<Array<Partial<T>>>([]);

    useEffect(() => {
        setChanges([]);
    }, [JSON.stringify(dataSource)]);

    const data = dataSource?.map((sourceEntity) => {
        const updated = changes.find((updatedValues) => sourceEntity.id === updatedValues.id);
        return updated ? { ...sourceEntity, ...updated } : sourceEntity;
    });

    const addChanges = (items: { id: ItemKey; assetChanges: Partial<T> }[]) => {
        const newChanges = items.reduce(
            (acc, { id, assetChanges }) => {
                const index = acc.findIndex((entity) => entity.id === id);
                index !== -1 ? (acc[index] = { ...acc[index], ...assetChanges }) : acc.push({ id, ...assetChanges });
                return acc;
            },
            [...changes]
        );

        setHasError(false);
        setChanges(newChanges);
    };

    const onSave = (assetChanges: T, sourceValue: T) => {
        if (!data) {
            message.warning("Something went wrong. Source data is missing. Try to reload the page");
            return;
        }

        const row = { ...sourceValue, ...assetChanges };
        const newChanges = selectedRowKeys.includes(row.id)
            ? selectedRowKeys.map((id) => ({ id, assetChanges }))
            : [{ id: row.id, assetChanges }];

        addChanges(newChanges);
    };

    const discard = () => {
        setChanges([]);
        setSelectedRowKeys([]);
        setHasError(false);
    };

    const submitChanges = () => {
        onFinish(changes);
        setSelectedRowKeys([]);
        setHasError(false);
    };

    const columns: EditableTableV2Column[] | undefined = defaultColumns?.map(({ editableCellProps, ...col }) => {
        if (!editableCellProps) return col;

        return {
            ...col,
            onCell: (record: T) => {
                const validationResult = col.validation?.(record);

                if (validationResult?.error && !hasError) {
                    setHasError(true);
                }

                return {
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editableCellProps,
                    disabled: validationResult?.disabled,
                    error: validationResult?.error,
                    onSave
                };
            }
        };
    });

    return (
        <Wrapper>
            <Table
                sticky
                rowKey={rowKey}
                rowSelection={rowSelection}
                {...tableProps}
                pagination={false}
                scroll={scroll}
                rowClassName="editable-row"
                components={components}
                dataSource={data}
                columns={columns}
            />

            {!!changes.length && (
                <FixedPageHeader
                    title={
                        hasError ? (
                            <Typography.Title type="warning" level={4}>
                                The table contains errors. Please resolve them before saving any changes.
                            </Typography.Title>
                        ) : (
                            "Save changes"
                        )
                    }
                    extra={[
                        <Button key="discard" onClick={discard}>
                            Discard
                        </Button>,
                        <Button key="save" type="primary" onClick={submitChanges} disabled={hasError}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Wrapper>
    );
}

const rowKey = (el: { id: ItemKey }) => el.id;

const Wrapper = styled.div`
    .editable-cell {
        position: relative;
    }

    .editable-cell-value-wrap {
        padding: 5px 12px;
        min-height: 32px;
        cursor: pointer;
    }

    .editable-row:hover .editable-cell-value-wrap {
        padding: 4px 11px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }
`;
