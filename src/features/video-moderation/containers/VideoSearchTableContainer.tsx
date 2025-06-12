import React, { useMemo } from "react";
import { Input, Pagination, Row, Col, TableProps, Table, Form, Button } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";

import { GetVideoListParams, Video } from "../services";
import { TaskVideoCard } from "features/video-tasks/components/TaskVideoCard";
import { useVideoSearch } from "../hooks/useVideoSearch";

export interface VideoSearchTableContainerProps extends TableProps<any> {
    stage: string;
    actionColumn?: ColumnType<Video>;
    baseSearchParams?: GetVideoListParams;
    renderSearchForm?: (onSearch: (newParams: GetVideoListParams) => void) => React.ReactNode;
}

export function VideoSearchTableContainer({
    stage,
    actionColumn = {},
    baseSearchParams,
    renderSearchForm,
    ...tableProps
}: VideoSearchTableContainerProps) {
    const { info, pageChange, onSearch } = useVideoSearch({ stage, baseSearchParams });

    const columns: ColumnsType<Video> = [
        {
            width: 120,
            title: "ID",
            dataIndex: "id"
        },
        {
            width: 140,
            title: "Thumbnail",
            render: (_, video) => <TaskVideoCard thumbnailUrl={video.thumbnailUrl} />
        },
        {
            width: 120,
            title: "Group Id",
            dataIndex: "groupId"
        },
        {
            width: 235,
            title: "Group Nick Name",
            dataIndex: "groupNickName",
            render: (_, video) => video.groupNickName ?? "Unknown"
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

const DefaultFilterForm = ({ onSearch }: { onSearch: (params: GetVideoListParams) => void }) => (
    <Form onFinish={onSearch} layout="horizontal">
        <Row gutter={24} justify="start">
            <Col>
                <Form.Item name="video" label="ID">
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
