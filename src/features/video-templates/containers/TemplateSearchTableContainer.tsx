import React, { useMemo } from "react";
import { Input, Pagination, Row, Col, TableProps, Table, Badge, Form, Button } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";

import { createCdnURLFromFiles } from "shared";
import { TaskVideoCard } from "features/video-tasks/components/TaskVideoCard";
import { Template, TemplateFilterParams } from "../services";
import { useTemplateSearch } from "../hooks/useTemplateSearch";

export interface TemplateSearchTableContainerProps extends TableProps<any> {
    stage: string;
    actionColumn?: ColumnType<Template>;
    baseParams?: TemplateFilterParams;
    renderSearchForm?: (onSearch: (newParams: TemplateFilterParams) => void) => React.ReactNode;
}

export function TemplateSearchTableContainer({
    stage,
    actionColumn = {},
    baseParams,
    renderSearchForm,
    ...tableProps
}: TemplateSearchTableContainerProps) {
    const { info, pageChange, onSearch } = useTemplateSearch({ stage, baseParams });

    const columns: ColumnsType<Template> = [
        {
            width: 120,
            title: "Temp ID",
            dataIndex: "id"
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
            render: (_, templ) => templ.title ?? "Unknown"
        },
        {
            width: 120,
            title: "Creator ID",
            dataIndex: "creatorId"
        },
        {
            width: 120,
            title: "Event ID",
            dataIndex: "eventId"
        },
        {
            width: 200,
            title: "Character Count",
            dataIndex: "characterCount"
        },
        {
            width: 200,
            title: "Usage Count",
            dataIndex: "usageCount"
        },
        {
            width: 200,
            title: "Trending Sort Order",
            dataIndex: "trendingSortingOrder"
        },
        {
            width: 120,
            title: "Status",
            render: (_, value) =>
                value.isDeleted ? <Badge color="red" text="Deleted" /> : <Badge color="blue" text="Active" />
        }
    ];

    const mergedColumns = useMemo(() => [...columns, actionColumn], [stage, actionColumn]);

    return (
        <Row gutter={[0, 10]}>
            {typeof renderSearchForm !== "undefined" ? (
                <Col span={24}>{renderSearchForm(onSearch)}</Col>
            ) : (
                <DefaultFilterForm onSearch={onSearch} />
            )}
            <Col span={24}>
                <Table
                    rowKey="id"
                    loading={info.loading}
                    dataSource={info.data}
                    columns={mergedColumns}
                    pagination={false}
                    scroll={{ x: 500, y: "calc(100vh - 300px)" }}
                    {...tableProps}
                />
            </Col>
            <Col span={24}>
                <Pagination
                    total={info.total}
                    pageSize={info.pageSize}
                    current={info.currentPage}
                    showSizeChanger={false}
                    onChange={pageChange}
                />
            </Col>
        </Row>
    );
}

const DefaultFilterForm = ({ onSearch }: { onSearch: (params: TemplateFilterParams) => void }) => (
    <Form onFinish={onSearch} layout="horizontal">
        <Row gutter={24} justify="start">
            <Col>
                <Form.Item name="id" label="ID">
                    <Input type="number" />
                </Form.Item>
            </Col>
            <Col>
                <Form.Item>
                    <Button htmlType="submit" ghost type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);
