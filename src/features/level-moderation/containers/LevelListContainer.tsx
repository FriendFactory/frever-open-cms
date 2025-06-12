import React from "react";
export * as qs from "query-string";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Avatar, Badge, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import dayjs from "dayjs";

import { USER_LEVEL_LIST_TAB_URL, LEVEL_DETAILS_URL } from "urls";
import { levelListPageSelector } from "../store/reducer/levelList.reducer";
import { Level, LevelListQueryParams } from "../services";
import { createCdnURLFromFiles, createSortableColumnProps } from "shared";

export interface LevelListContainerProps {}

export function LevelListContainer({}: LevelListContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_LEVEL_LIST_TAB_URL.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;
    const params = urlMatch.query;

    const info = useSelector(levelListPageSelector(stage, params || {}));

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const onRow = (record: Level) => ({
        onClick: () => {
            history.push(LEVEL_DETAILS_URL.format({ stage, id: record.id }));
        }
    });

    const handleOnChange: TableProps<Level>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: LevelListQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as LevelListQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = USER_LEVEL_LIST_TAB_URL.replace(location, {}, { ...params });
        newUrl && history.replace(newUrl);
    };

    const columns: ColumnsType<Level> = [
        {
            dataIndex: "id",
            title: "ID",
            width: 110,
            fixed: "left",
            ...sortableColumnProps("id")
        },
        {
            title: "Thumbnail",
            width: 110,
            render: (_, level) => {
                const event = level.event?.length ? level.event[0] : null;
                return (
                    <Avatar
                        shape="square"
                        size={65}
                        src={
                            event
                                ? createCdnURLFromFiles({
                                      id: event.id,
                                      files: event.files,
                                      stage: stage,
                                      entityType: "event",
                                      resolution: "128x128"
                                  })
                                : ""
                        }
                    />
                );
            }
        },
        {
            title: "Created Time",
            width: 135,
            ...sortableColumnProps("createdTime"),
            render: (_, level) =>
                level.createdTime ? dayjs.utc(level.createdTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"
        },
        {
            title: "Modified Time",
            width: 135,
            ...sortableColumnProps("modifiedTime"),
            render: (_, level) =>
                level.modifiedTime ? dayjs.utc(level.modifiedTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"
        },
        {
            title: "Template ID",
            width: 115,
            render: (_, level) => <div>{level.levelTemplateId ?? "Unknown"}</div>
        },
        {
            title: "Remix from",
            width: 120,
            render: (_, level) => <div>{level.remixedFromLevelId ? level.remixedFromLevelId : "None"}</div>
        },
        {
            title: "Is Draft",
            width: 70,
            render: (_, level) => (
                <Badge color={level.isDraft ? "blue" : "yellow"} text={level.isDraft ? "Yes" : "No"} />
            )
        },
        {
            title: "Is Deleted",
            width: 70,
            render: (_, level) => (
                <Badge color={level.isDeleted ? "red" : "blue"} text={level.isDeleted ? "Yes" : "No"} />
            )
        }
    ];

    return (
        <Table
            rowKey="id"
            dataSource={info.data}
            loading={info.loading}
            columns={columns}
            onChange={handleOnChange}
            onRow={onRow}
            pagination={false}
            scroll={{ x: 750 }}
        />
    );
}
