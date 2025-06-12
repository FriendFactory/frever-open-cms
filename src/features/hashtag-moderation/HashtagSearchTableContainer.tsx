import React, { useMemo } from "react";
import { Input, Pagination, Row, Col, TableProps, Table, Form, Button } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";

import { ProtectedLink } from "shared";
import { VIDEO_MODERATION_LIST_URL } from "urls";
import { Hashtag, GetHashtagListParams } from "./services";
import { useHashtagSearch } from "./hooks/useHashtagSearch";

export interface HashtagSearchTableContainerProps extends TableProps<any> {
    stage: string;
    actionColumn?: ColumnType<Hashtag>;
    baseParams?: GetHashtagListParams;
    renderSearchForm?: (onSearch: (newParams: GetHashtagListParams) => void) => React.ReactNode;
}

export function HashtagSearchTableContainer({
    stage,
    actionColumn = {},
    baseParams,
    renderSearchForm,
    ...tableProps
}: HashtagSearchTableContainerProps) {
    const { info, pageChange, onSearch } = useHashtagSearch({ stage, baseParams });

    const columns: ColumnsType<Hashtag> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 225
        },
        {
            title: "Views Count",
            dataIndex: "viewsCount",
            width: 115
        },
        {
            title: "Challenge Sort Order",
            dataIndex: "challengeSortOrder",
            width: 115
        },
        {
            title: "Video Count",
            dataIndex: "videoCount",
            width: 115,
            render: (_, record) => (
                <ProtectedLink
                    feature="VideoModeration"
                    to={VIDEO_MODERATION_LIST_URL.format({ stage }, { hashtag: record.name })}>
                    {record.videoCount}
                </ProtectedLink>
            )
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

const DefaultFilterForm = ({ onSearch }: { onSearch: (params: GetHashtagListParams) => void }) => (
    <Form onFinish={onSearch} layout="horizontal">
        <Row gutter={24} justify="start">
            <Col flex="250px">
                <Form.Item name="name" label="Name">
                    <Input />
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
