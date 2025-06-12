import React, { useCallback } from "react";
import { Button, Popconfirm, Result, Tag } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { DeleteOutlined } from "@ant-design/icons";

import {
    actionColumnRender,
    ActionColumnRenderProps,
    EditableTable,
    EditableTableColumn,
    readinessColor
} from "shared";
import { useExtraData } from "shared/hooks/useExtraData";
import { CreatePlaylistFormContainer } from "./CreatePlaylistFormContainer";
import { PLAYLISTS_PAGE_URL, PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { Playlist } from "../services";
import { playlistsPageSelector } from "../store/reducer/playlists/playlistsStatus.reducer";
import { deletePlaylistAction, updatePlaylistDetailsAction } from "../store/actions";

export function PlaylistsGridContainer() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const urlMatch = PLAYLISTS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) {
        return <Result title="Invalid URL" />;
    }

    const {
        params: { stage },
        query = {}
    } = urlMatch;

    const info = useSelector(playlistsPageSelector(stage, query), shallowEqual);
    const readiness = useExtraData({ stage, name: "Readiness" });

    const deletePlaylist = useCallback(
        (playlist: Playlist) => () => dispatch(deletePlaylistAction({ stage, playlist })),
        [stage]
    );

    const updatePlaylistDetails = useCallback(
        (form: Partial<Playlist>) => {
            const externalPlaylistId = info.data?.find((el) => form.id === el.id)?.externalPlaylistId;

            const data = { ...form };

            if (form.externalPlaylist && externalPlaylistId) {
                data.externalPlaylist = { ...form.externalPlaylist, id: externalPlaylistId };
            }

            dispatch(updatePlaylistDetailsAction({ stage, data }));
        },
        [stage, info.data]
    );

    const columns: EditableTableColumn<Playlist>[] = [
        {
            title: "ID",
            width: 120,
            dataIndex: "id"
        },
        {
            title: "Name",
            width: 220,
            dataIndex: ["externalPlaylist", "name"],
            editableCellProps: { type: "text" }
        },
        {
            title: "Readiness",
            width: 140,
            dataIndex: "readinessId",
            editableCellProps: { options: readiness.data?.map((el) => ({ label: el.name, value: el.id })) },
            render: (_, record) => (
                <Tag color={readinessColor[record.readinessId]}>
                    {readiness.data?.find((el) => el.id === record.readinessId)?.name ??
                        record.readinessId ??
                        "Unknown"}
                </Tag>
            )
        },
        {
            title: "Sort Order",
            width: 100,
            editableCellProps: { type: "number" },
            dataIndex: "sortOrder"
        }
    ];

    const actionColumn = {
        title: <CreatePlaylistFormContainer />,
        render: (props: ActionColumnRenderProps<Playlist>) =>
            actionColumnRender({
                ...props,
                extra: (record) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Popconfirm
                            title="Are you sure you want to delete this playlist?"
                            onConfirm={deletePlaylist(record)}
                            okButtonProps={{ danger: true }}
                            okText="Delete">
                            <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </div>
                )
            })
    };

    const handleOnRow = (record: Playlist) => ({
        onClick: () => history.push(PLAYLIST_DETAILS_PAGE_URL.format({ stage, id: record.id }))
    });

    return (
        <EditableTable
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            actionColumnProps={actionColumn}
            onFinish={updatePlaylistDetails}
            onRow={handleOnRow}
        />
    );
}
