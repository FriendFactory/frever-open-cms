import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

import { Tag } from "shared";
import { useExtraData } from "shared/hooks/useExtraData";
import { deleteEntityAction } from "shared/store";
import { TAG_DETAILS_PAGE_URL } from "urls";
import { TagFilterParams } from "./TagFilterFormContainer";

export interface TagListContainerProps {
    url: UrlPath<{ stage: string }, TagFilterParams>;
}

export function TagListContainer({ url }: TagListContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return null;

    const params = urlMatch.query ?? {};
    const stage = urlMatch.params.stage;

    const info = useExtraData({ stage, name: "Tag", forceUpdate: true });
    const categories = useExtraData({ stage, name: "TagCategory" });

    const handleDeleteTag = (entityId: number) => () =>
        dispatch(deleteEntityAction({ stage, entityName: "Tag", entityId }));

    const handleOnRow = (row: Tag) => ({
        onClick: () => history.push(TAG_DETAILS_PAGE_URL.format({ stage, id: row.id }))
    });

    const data = useMemo(
        () =>
            info.data?.filter((tag) => {
                const isMatchByName = params.name
                    ? tag.name.toLocaleLowerCase().includes(params.name.toLowerCase())
                    : true;
                const isMatchById = params.id ? params.id == tag.id : true;
                const isMatchByCategoryId = params.categoryId ? params.categoryId == tag.categoryId : true;

                return isMatchByName && isMatchById && isMatchByCategoryId;
            }) ?? [],
        [info.data, params]
    );

    const columns: ColumnType<Tag>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115,
            sorter: (a, b) => a.id - b.id
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 300,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Category",
            width: 225,
            render: (_, tag) => categories?.data?.find((el) => el.id === tag.categoryId)?.name ?? "unknown"
        },
        {
            title: "",
            width: 65,
            align: "center",
            render: (_, tag) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Popconfirm
                        title="Are you sure to delete this tag?"
                        onConfirm={handleDeleteTag(tag.id)}
                        okText="Yes"
                        cancelText="No">
                        <Button danger ghost icon={<DeleteOutlined />} onClick={(e) => e.stopPropagation()} />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <Table
            rowKey="id"
            dataSource={data}
            columns={columns}
            loading={(!info.data && info.loading) || categories.loading}
            onRow={handleOnRow}
            pagination={{ position: ["bottomLeft"], defaultPageSize: 50 }}
        />
    );
}
