import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Button, Popconfirm, TableColumnProps, Tag } from "antd";
import Table, { TableProps } from "antd/es/table";
import { LockOutlined, MinusOutlined, UnlockOutlined } from "@ant-design/icons";

import { createSortableColumnProps, useExtraData } from "shared";
import { Crew, CrewListQueryParams } from "../services";
import { crewListPageSelector } from "../store/reducer";
import { CREWS_LIST_PAGE_URL, CREW_DETAILS_PAGE_URL } from "urls";
import { CrewListThumbnail } from "./CrewListThumbnailContainer";
import { deleteCrewAction } from "../store/actions";

interface CrewsListContainerProps {
    stage: string;
    params?: CrewListQueryParams;
}

export function CrewsListContainer({ stage, params }: CrewsListContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const info = useSelector(crewListPageSelector(stage, params || {}));
    const languages = useExtraData({ stage, name: "Language" });

    const handleOnRow = (record: Crew) => ({
        onClick: () => history.push(CREW_DETAILS_PAGE_URL.format({ stage, id: record.id }))
    });

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<Crew>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: CrewListQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as CrewListQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = CREWS_LIST_PAGE_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const handleOnDelete = (item: Crew) => dispatch(deleteCrewAction({ stage, data: item }));

    const columns: TableColumnProps<Crew>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 140,
            ...sortableColumnProps("name")
        },
        {
            title: "Thumbnail",
            width: 110,
            render: (_, record) => <CrewListThumbnail stage={stage} id={record.id} version={record.files[0].version} />
        },
        {
            title: "Description",
            dataIndex: "description",
            ellipsis: true,
            width: 240
        },
        {
            title: "Language",
            dataIndex: "languageId",
            ellipsis: true,
            width: 100,
            render: (_, record) => languages?.data?.find((language) => language.id === record.languageId)?.name ?? ""
        },
        {
            title: "Trophy Score",
            dataIndex: "trophyScore",
            ellipsis: true,
            width: 100,
            ...sortableColumnProps("trophyScore")
        },
        {
            title: "Is Public",
            width: 100,
            render: (_, record) => (
                <Tag
                    icon={record.isPublic ? <UnlockOutlined /> : <LockOutlined />}
                    color={record.isPublic ? "blue" : "warning"}>
                    {record.isPublic ? "Public" : "Private"}
                </Tag>
            )
        },
        {
            title: "Is Deleted",
            width: 100,
            render: (_, record) => (
                <Badge color={record.isDeleted ? "red" : "blue"} text={record.isDeleted ? "Deleted" : "Active"} />
            )
        },
        {
            title: "",
            align: "right",
            width: "65px",
            render: (_, record) =>
                !record.isDeleted ? (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Popconfirm
                            title="Please confirm the delete action. This cannot be undone via the CMS."
                            okText="Delete"
                            okType="danger"
                            onConfirm={() => handleOnDelete(record)}>
                            <Button ghost danger type="primary" icon={<MinusOutlined />} />
                        </Popconfirm>
                    </div>
                ) : null
        }
    ];

    return (
        <Table
            sticky
            rowKey="id"
            loading={info.loading}
            onChange={handleOnChange}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            scroll={{ x: 800 }}
            onRow={handleOnRow}
        />
    );
}
