import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Alert, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";

import { USER_PHOTO_LIST_TAB_URL, PHOTO_DETAILS_URL } from "urls";
import { GetUserPhotoParams, Photo } from "../../services";
import { userMediaFileListPageSelector } from "features/user-media/store/reducer/userMediaFileListReducer";
import { ReadinessTag } from "shared/components/ReadinessTag";
import { createSortableColumnProps } from "shared";

export interface UserPhotoListContainerProps {}

export function UserPhotoListContainer({}: UserPhotoListContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_PHOTO_LIST_TAB_URL.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage } = urlMatch.params;
    const params = urlMatch.query;

    const info = useSelector(userMediaFileListPageSelector(stage, "Photo", params));

    const onRow = (record: Photo) => ({
        onClick: () => {
            history.push(PHOTO_DETAILS_URL.format({ stage, id: record.id }));
        }
    });

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<Photo>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: GetUserPhotoParams = {
            orderBy: sorter.order ? (sorter.columnKey as GetUserPhotoParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = USER_PHOTO_LIST_TAB_URL.replace(location, {}, { ...params });
        newUrl && history.replace(newUrl);
    };

    const columns: ColumnsType<Photo> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115,
            ...sortableColumnProps("id")
        },
        {
            title: "Created Time",
            width: 160,
            render: (_, photo) => {
                const createdTime = photo.createdTime;
                return createdTime ? dayjs.utc(createdTime).format("DD MMM YYYY  HH:mm:ss") : "<Null>";
            },
            ...sortableColumnProps("createdTime")
        },
        {
            title: "Modified Time",
            width: 160,
            render: (_, photo) => {
                const modifiedTime = photo.modifiedTime;
                return modifiedTime ? dayjs.utc(modifiedTime).format("DD MMM YYYY  HH:mm:ss") : "<Null>";
            },
            ...sortableColumnProps("modifiedTime")
        },
        {
            title: "Height",
            dataIndex: "resolutionHeight",
            width: 115
        },
        {
            title: "Width",
            dataIndex: "resolutionWidth",
            width: 115
        },
        {
            width: 155,
            title: "Readiness",
            dataIndex: "readinessId",
            render: (_, photo) =>
                photo.readinessId ? <ReadinessTag stage={stage} readinessId={photo.readinessId} /> : "Unknown"
        }
    ];

    return (
        <Table
            rowKey="id"
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            onChange={handleOnChange}
            onRow={onRow}
            scroll={{ x: 750 }}
        />
    );
}
