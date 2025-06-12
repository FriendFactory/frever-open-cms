import React, { useCallback } from "react";
import { Button, Table } from "antd";
import { ColumnType, SorterResult } from "antd/lib/table/interface";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Task, TaskListQueryParams } from "../services";
import { TaskVideoCard } from "./TaskVideoCard";
import { createCdnURLFromFiles } from "shared";
import { CreateTaskContainer } from "../containers/CreateTask/CreateTaskContainer";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface TaskListProps {
    stage: string;
    loading: boolean;
    data?: Task[];
    orderBy?: TaskListQueryParams["orderBy"];
    sortDirection?: TaskListQueryParams["sortDirection"];
    onRow: (record: Task) => { onClick: () => void };
    onSort: (orderBy: TaskListQueryParams["orderBy"], sortDirection: TaskListQueryParams["sortDirection"]) => void;
}

export function TaskList({ stage, data, loading, orderBy, sortDirection, onRow, onSort }: TaskListProps) {
    const getRowKey = useCallback((row: Task) => row.id.toString(), [data]);

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

    const sortableColumnProps = useCallback(
        (
            column: TaskListQueryParams["orderBy"]
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

    const columns: ColumnType<Task>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: "100px",
            ...sortableColumnProps("id")
        },
        {
            title: "Thumbnail",
            width: "140px",
            render: (_: unknown, task: Task) => (
                <TaskVideoCard
                    thumbnailUrl={createCdnURLFromFiles({
                        stage,
                        entityType: "SchoolTask",
                        id: task.id,
                        files: task.files,
                        resolution: "512x512"
                    })}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "220px",
            ...sortableColumnProps("name")
        },
        {
            title: "SortOrder",
            dataIndex: "sortOrder",
            width: "100px",
            ...sortableColumnProps("sortOrder")
        },
        {
            title: "CreatedTime",
            width: "180px",
            render: (_: unknown, task: Task) =>
                task.createdTime ? dayjs.utc(task.createdTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown",
            ...sortableColumnProps("createdTime")
        },
        {
            title: "ModifiedTime",
            width: "180px",
            render: (_: unknown, task: Task) =>
                task.modifiedTime ? dayjs.utc(task.modifiedTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown",
            ...sortableColumnProps("modifiedTime")
        },
        {
            title: "Readiness",
            width: "160px",
            render: (_, task) => <ReadinessTag stage={stage} readinessId={task.readinessId} />
        },
        {
            title: (
                <CreateTaskContainer stage={stage} button={<Button type="primary" ghost icon={<PlusOutlined />} />} />
            ),
            width: "60px",
            align: "right",
            fixed: "right"
        }
    ];

    return (
        <Table
            sticky
            loading={loading}
            pagination={false}
            dataSource={data}
            columns={columns}
            scroll={{ x: 600 }}
            rowKey={getRowKey}
            onChange={handleOnChange as any}
            onRow={onRow}
        />
    );
}
