import React from "react";
import { Badge, Button, Popconfirm, Table } from "antd";
import { ColumnsType, SorterResult, TableRowSelection } from "antd/lib/table/interface";
import dayjs from "dayjs";

import { Template, TemplateFilterParams } from "features/video-templates/services";
import { TaskVideoCard } from "features/video-tasks/components/TaskVideoCard";
import { createCdnURLFromFiles } from "shared";
import { createSortableColumnProps } from "shared";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";

export interface TemplateListProps {
    data?: Template[];
    loading: boolean;
    stage: string;
    sortDirection?: TemplateFilterParams["sortDirection"];
    sortBy?: TemplateFilterParams["sortBy"];
    getCategory: (id: number) => string | undefined;
    onRow: (template: Template) => { onClick: () => void };
    onSort: (sortBy: TemplateFilterParams["sortBy"], sortDirection: TemplateFilterParams["sortDirection"]) => void;
    rowSelection: TableRowSelection<Template>;
    onClickDelete: (value: Template) => void;
}

export function TemplateList({
    data,
    loading,
    rowSelection,
    stage,
    sortDirection,
    sortBy,
    onRow,
    getCategory,
    onSort,
    onClickDelete
}: TemplateListProps) {
    const sortableProps = createSortableColumnProps<TemplateFilterParams["sortBy"]>(sortBy, sortDirection);

    const handleOnChange = (_paging: unknown, _filter: unknown, sorter: SorterResult<any>) => {
        if (sorter.columnKey) {
            !sorter.order
                ? onSort(undefined, undefined)
                : onSort(sorter.columnKey as any, sorter.order === "ascend" ? "asc" : "desc");
        }
    };

    const columns: ColumnsType<Template> = [
        {
            width: 120,
            title: "Temp ID",
            dataIndex: "id",
            ...sortableProps("id")
        },
        {
            width: 140,
            title: "Thumbnail",
            render: (_, template) => (
                <TaskVideoCard
                    thumbnailUrl={createCdnURLFromFiles({
                        stage,
                        entityType: "Template",
                        id: template.id,
                        files: template.files,
                        resolution: "512x512"
                    })}
                />
            )
        },
        {
            width: 235,
            title: "Title",
            dataIndex: "title",
            render: (_, templ) => templ.title ?? "Unknown",
            ...sortableProps("title")
        },
        {
            width: 120,
            title: "Creator ID",
            dataIndex: "creatorId",
            ...sortableProps("creatorId")
        },
        {
            width: 120,
            title: "Event ID",
            dataIndex: "eventId",
            ...sortableProps("eventId")
        },
        {
            width: 200,
            title: "Created At",
            render: (_, templ) =>
                templ.createdTime ? dayjs.utc(templ.createdTime).format("DD MMM YYYY HH:mm") : "Unknown",
            ...sortableProps("createdTime")
        },
        {
            width: 200,
            title: "Modified At",
            render: (_, templ) =>
                templ.modifiedTime ? dayjs.utc(templ.modifiedTime).format("DD MMM YYYY HH:mm") : "Unknown",
            ...sortableProps("modifiedTime")
        },
        {
            width: 200,
            title: "Category",
            render: (_, templ) => getCategory(templ.templateSubCategoryId) ?? "Unknown",
            ...sortableProps("templateSubCategoryId")
        },
        {
            width: 200,
            title: "Character Count",
            dataIndex: "characterCount",
            ...sortableProps("characterCount")
        },
        {
            width: 200,
            title: "Usage Count",
            dataIndex: "usageCount",
            ...sortableProps("usageCount")
        },
        {
            width: 200,
            title: "Trending Sort Order",
            dataIndex: "trendingSortingOrder",
            ...sortableProps("trendingSortingOrder")
        },
        {
            width: 120,
            title: "Status",
            render: (_, value) =>
                value.isDeleted ? <Badge color="red" text="Deleted" /> : <Badge color="blue" text="Active" />
        },
        {
            width: 65,
            fixed: "right",
            render: (_, value) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Popconfirm
                        title={`${value.isDeleted ? "Restore" : "Delete"} selected template(s)?`}
                        onConfirm={() => onClickDelete(value)}>
                        <Button
                            type="primary"
                            ghost
                            danger={!value.isDeleted}
                            icon={value.isDeleted ? <UndoOutlined /> : <DeleteOutlined />}
                        />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <Table
            sticky
            rowKey="id"
            loading={loading}
            dataSource={data}
            columns={columns}
            rowSelection={rowSelection}
            onRow={onRow}
            onChange={handleOnChange as any}
            pagination={false}
            scroll={{ x: 1500 }}
        />
    );
}
