import React from "react";
export * as qs from "query-string";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Avatar, Badge, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";

import { USER_OUTFIT_LIST_TAB_URL, OUTFIT_DETAILS_URL } from "urls";
import { Outfit } from "features/user-moderation/services";
import { outfitListPageSelector } from "../store/reducer/outfitList.reducer";
import { ReadinessTag } from "shared/components/ReadinessTag";
import { createCdnURLFromFiles, createSortableColumnProps } from "shared";
import { OutfitListQueryParams } from "../services";

export interface UserOutfitListContainerProps {}

export function UserOutfitListContainer({}: UserOutfitListContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_OUTFIT_LIST_TAB_URL.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;
    const params = urlMatch.query;

    const info = useSelector(outfitListPageSelector(stage, params || {}));

    const handleOnRow = (outfit: Outfit) => ({
        onClick: () => history.push(OUTFIT_DETAILS_URL.format({ stage, id: outfit.id }))
    });

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<Outfit>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: OutfitListQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as OutfitListQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = USER_OUTFIT_LIST_TAB_URL.replace(location, {}, { ...params });
        newUrl && history.replace(newUrl);
    };

    const columns: ColumnsType<Outfit> = [
        {
            title: "Outfit ID",
            dataIndex: "id",
            width: 100,
            ...sortableColumnProps("id")
        },
        {
            title: "Thumbnail",
            width: 110,
            render: (_, { id, files }) => (
                <Avatar
                    shape="square"
                    size={65}
                    src={createCdnURLFromFiles({
                        id,
                        files,
                        stage,
                        entityType: "outfit",
                        resolution: "128x128"
                    })}
                />
            )
        },
        {
            title: "Created Time",
            width: 125,
            render: (_, outfit) =>
                outfit.createdTime ? dayjs.utc(outfit.createdTime).format("DD MMM YYYY HH:mm:ss") : "Unknown",
            ...sortableColumnProps("createdTime")
        },
        {
            title: "Modified Time",
            width: 125,
            render: (_, outfit) =>
                outfit.modifiedTime ? dayjs.utc(outfit.modifiedTime).format("DD MMM YYYY HH:mm:ss") : "Unknown",
            ...sortableColumnProps("modifiedTime")
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            width: 110
        },
        {
            title: "Is Deleted",
            dataIndex: "isDeleted",
            width: 120,
            render: (_, outfit) => (
                <Badge color={outfit.isDeleted ? "red" : "blue"} text={outfit.isDeleted ? "Yes" : "No"} />
            )
        },
        {
            title: "Readiness",
            width: 120,
            render: (_, outfit) =>
                outfit.readinessId ? <ReadinessTag stage={stage} readinessId={outfit.readinessId} /> : "Unknown"
        }
    ];

    return (
        <Table
            rowKey="id"
            dataSource={info.data}
            columns={columns}
            loading={info.loading}
            onChange={handleOnChange}
            onRow={handleOnRow}
            pagination={false}
            scroll={{ x: 500 }}
        />
    );
}
