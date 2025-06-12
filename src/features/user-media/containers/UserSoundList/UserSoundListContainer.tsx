import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Badge, Table, TableProps } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import { USER_SOUND_LIST_TAB_URL, USERSOUND_DETAILS_URL } from "urls";
import { GetUserSoundParams, UserSound } from "../../services";
import { userMediaFileListPageSelector } from "features/user-media/store/reducer/userMediaFileListReducer";
import { createSortableColumnProps } from "shared";

export interface UserSoundListContainerProps {}

export function UserSoundListContainer({}: UserSoundListContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_SOUND_LIST_TAB_URL.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;
    const params = urlMatch.query;

    const info = useSelector(userMediaFileListPageSelector(stage, "UserSound", params));

    const onRow = (record: UserSound) => ({
        onClick: () => {
            history.push(USERSOUND_DETAILS_URL.format({ stage, id: record.id }));
        }
    });

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<UserSound>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: GetUserSoundParams = {
            orderBy: sorter.order ? (sorter.columnKey as GetUserSoundParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = USER_SOUND_LIST_TAB_URL.replace(location, {}, { ...params });
        newUrl && history.replace(newUrl);
    };
    const columns: ColumnType<UserSound>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115,
            ...sortableColumnProps("id")
        },
        {
            title: "Created Time",
            width: 160,
            render: (_, sound) => {
                const createdTime = sound.createdTime;
                return createdTime ? dayjs.utc(createdTime).format("DD MMM YYYY  HH:mm:ss") : "<Null>";
            },
            ...sortableColumnProps("createdTime")
        },
        {
            title: "Size",
            dataIndex: "size",
            width: 115,
            ...sortableColumnProps("size")
        },
        {
            title: "Duration",
            dataIndex: "duration",
            width: 115,
            render: (_, sound) => dayjs.duration(sound.duration).format("m:s"),
            ...sortableColumnProps("duration")
        },
        {
            title: "Is Deleted",
            width: 70,
            render: (_, sound) => (
                <Badge color={sound.deletedAt ? "red" : "blue"} text={sound.deletedAt ? "Yes" : "No"} />
            )
        }
    ];
    return (
        <Table
            rowKey="id"
            dataSource={info.data}
            loading={info.loading}
            columns={columns}
            pagination={false}
            onChange={handleOnChange}
            onRow={onRow}
            scroll={{ x: 750 }}
        />
    );
}
