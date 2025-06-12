import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Badge, TableProps } from "antd";
import { useDispatch } from "react-redux";

import { createSortableColumnProps, EditableTable, EditableTableColumn } from "shared";
import { replaceFalsyValuesWithNull } from "utils";
import { CREATE_PAGE_DETAILS_URL, CREATE_PAGE_LIST_URL } from "urls";
import { CreatePageContentQuery, CreatePageContentTypes, CreatePageRow, CreatePageRowQueryParams } from "../services";
import { createPageListPageSelector } from "../store/reducer";
import { upsertSingleCreatePageRowAction } from "../store/actions";
import { AddCreatePageRowContainer } from "./AddCreatePageRowContainer";
import { transformCreatePageRowContent } from "../helpers";

interface CreatePageRowListContainerProps {
    stage: string;
    params: CreatePageRowQueryParams;
}

export function CreatePageRowListContainer({ stage, params }: CreatePageRowListContainerProps) {
    const dispatch = useDispatch();
    const history = useHistory();
    const info = useSelector(createPageListPageSelector(stage, params), shallowEqual);

    const onRow = (row: CreatePageRow) => ({
        onClick: () => history.push(CREATE_PAGE_DETAILS_URL.format({ stage, id: row.id }))
    });

    const handleOnFinish = (data: CreatePageRow, sourceData: CreatePageRow) => {
        const resulData = replaceFalsyValuesWithNull(transformCreatePageRowContent({ ...sourceData, ...data }));

        dispatch(upsertSingleCreatePageRowAction({ stage, data: resulData }));
    };

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<CreatePageRow>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: CreatePageRowQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as CreatePageRowQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = CREATE_PAGE_LIST_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const columns: EditableTableColumn<CreatePageRow>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
            ...sortableColumnProps("id")
        },
        {
            title: "Title",
            dataIndex: "title",
            editableCellProps: { type: "string" },
            width: 120
        },
        {
            title: "Content Type",
            dataIndex: "contentType",
            width: 80,
            render: (_, entity) =>
                Object.entries(CreatePageContentTypes).find(([, value]) => value === entity.contentType)?.[0]
        },
        {
            title: "Content Query",
            dataIndex: "contentQuery",
            width: 110,
            render: (_, entity) =>
                Object.entries(CreatePageContentQuery).find(([, value]) => value === entity.contentQuery)?.[0]
        },
        {
            title: "Test Group",
            dataIndex: "testGroup",
            editableCellProps: { type: "string" },
            width: 100
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            editableCellProps: { type: "number" },
            width: 80,
            ...sortableColumnProps("sortOrder")
        },
        {
            title: "Is Enabled",
            dataIndex: "isEnabled",
            editableCellProps: { type: "checkbox" },
            width: 120,
            render: (_, entity) => (
                <Badge color={entity.isEnabled ? "blue" : "red"} text={entity.isEnabled ? "Enabled" : "Disabled"} />
            )
        }
    ];

    const actionColumnsProps = {
        title: <AddCreatePageRowContainer />,
        fixed: false,
        width: 136
    };

    return (
        <EditableTable
            rowKey="id"
            onFinish={handleOnFinish}
            onChange={handleOnChange}
            onRow={onRow}
            scroll={{ x: 700 }}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            actionColumnProps={actionColumnsProps}
            pagination={false}
        />
    );
}
