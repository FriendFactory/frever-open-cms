import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SorterResult } from "antd/lib/table/interface";
import { Button, Dropdown } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";
import dayjs from "dayjs";

import { SeasonBaseInfo, SeasonListQueryParams } from "../services";
import { CreateSeasonContainer } from "../containers/CreateSeasonContainer";
import { CopySeasonContainer } from "../containers/CopySeasonContainer";
import { actionColumnRender, ActionColumnRenderProps, EditableTable, EditableTableColumn } from "shared";
import { postSeasonAction } from "../store/actions";

export interface SeasonListProps {
    stage: string;
    loading: boolean;
    data?: SeasonBaseInfo[];
    orderBy?: SeasonListQueryParams["orderBy"];
    sortDirection?: SeasonListQueryParams["sortDirection"];
    onRow: (record: SeasonBaseInfo) => { onClick: () => void };
    onSort: (orderBy: SeasonListQueryParams["orderBy"], sortDirection: SeasonListQueryParams["sortDirection"]) => void;
}

export function SeasonList({ stage, data, loading, orderBy, sortDirection, onRow, onSort }: SeasonListProps) {
    const dispatch = useDispatch();

    const handleOnChange = useCallback(
        (_paging: unknown, _filter: unknown, sorter: SorterResult<any>) => {
            if (sorter.columnKey) {
                if (sorter.order === undefined) {
                    onSort(undefined, undefined);
                } else {
                    onSort(sorter.columnKey as any, sorter.order === "ascend" ? "asc" : "desc");
                }
            }
        },
        [onSort]
    );
    const handleOnFinish = (updated: SeasonBaseInfo, source?: SeasonBaseInfo) =>
        dispatch(postSeasonAction({ stage, data: { ...source, ...updated } }));

    const sortableColumnProps = useCallback(
        (
            column: SeasonListQueryParams["orderBy"]
        ): { key?: string; sorter: any; sortOrder?: "ascend" | "descend" | null } => {
            if (!column) {
                return {
                    sorter: false
                };
            }

            return {
                key: column,
                sorter: true,
                sortOrder: column === orderBy ? (sortDirection === "asc" ? "ascend" : "descend") : undefined
            };
        },
        [orderBy, sortDirection]
    );

    const columns: EditableTableColumn<SeasonBaseInfo>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: "100px",
            ...sortableColumnProps("id")
        },
        {
            title: "Title",
            dataIndex: "title",
            width: "220px",
            editableCellProps: { type: "text" },
            ...sortableColumnProps("title")
        },

        {
            title: "Start Date",
            dataIndex: "startDate",
            width: "180px",
            editableCellProps: (record) => ({
                type: "date",
                defaultValue: dayjs.utc(record.startDate),
                format: "DD MMM YYYY"
            }),
            render: (_: unknown, season: SeasonBaseInfo) =>
                dayjs.utc(season.startDate).format("DD MMM YYYY") ?? "Unknown",
            ...sortableColumnProps("startDate")
        },
        {
            title: "End Date",
            width: "180px",
            dataIndex: "endDate",
            editableCellProps: (record) => ({
                type: "date",
                defaultValue: dayjs.utc(record.endDate),
                format: "DD MMM YYYY"
            }),
            render: (_: unknown, season: SeasonBaseInfo) =>
                dayjs.utc(season.endDate).format("DD MMM YYYY") ?? "Unknown",
            ...sortableColumnProps("endDate")
        }
    ];

    const actionColumns = {
        title: <CreateSeasonContainer stage={stage} type="primary" ghost icon={<PlusOutlined />} />,
        render: (props: ActionColumnRenderProps<SeasonBaseInfo>) =>
            actionColumnRender({
                ...props,
                extra: (season) => {
                    const items: ItemType[] = [
                        {
                            key: "copy-season",
                            label: (
                                <CopySeasonContainer stage={stage} id={season.id}>
                                    Copy Season
                                </CopySeasonContainer>
                            )
                        }
                    ];
                    return (
                        <Dropdown menu={{ items }}>
                            <Button icon={<MoreOutlined />} />
                        </Dropdown>
                    );
                }
            })
    };

    return (
        <EditableTable
            rowKey="id"
            loading={loading}
            pagination={false}
            dataSource={data}
            columns={columns}
            scroll={{ x: 600 }}
            onChange={handleOnChange as any}
            onRow={onRow}
            onFinish={handleOnFinish}
            actionColumnProps={actionColumns}
        />
    );
}
