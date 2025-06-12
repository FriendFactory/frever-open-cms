import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { TableProps } from "antd";

import { SPAWN_FORMATION_LIST_PAGE_URL } from "urls";
import { createSortableColumnProps, EditableTable, EditableTableColumn, useExtraDataBundle } from "shared";
import { spawnFormationListSelector } from "../store/reducer";
import { updateSpawnFormationAction } from "../store/actions";
import { CharacterSpawnPositionFormation, SpawnFormationQueryParams } from "../services";

interface SpawnFormationListContainerProps {
    stage: string;
    params: SpawnFormationQueryParams;
}

export function SpawnFormationListContainer({ stage, params }: SpawnFormationListContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const extraBundle = useExtraDataBundle(["CharacterSpawnPositionFormationType"]);
    const info = useSelector(spawnFormationListSelector(stage, params));

    const handleOnFinish = (data: CharacterSpawnPositionFormation) =>
        dispatch(updateSpawnFormationAction({ stage, data }));

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<CharacterSpawnPositionFormation>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: SpawnFormationQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as SpawnFormationQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = SPAWN_FORMATION_LIST_PAGE_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const columns: EditableTableColumn<CharacterSpawnPositionFormation>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 150,
            editableCellProps: { type: "text" }
        },
        {
            title: "Character Count",
            dataIndex: "characterCount",
            width: 100,
            ...sortableColumnProps("characterCount")
        },
        {
            title: "Formation Type",
            dataIndex: "characterSpawnPositionFormationTypeId",
            width: 100,
            editableCellProps: {
                options: extraBundle.bundle.CharacterSpawnPositionFormationType?.data?.map((el) => ({
                    label: el.name,
                    value: el.id
                }))
            },
            render: (_, record) =>
                extraBundle.bundle.CharacterSpawnPositionFormationType?.data?.find(
                    (el) => el.id === record.characterSpawnPositionFormationTypeId
                )?.name ??
                record.characterSpawnPositionFormationTypeId ??
                "Unknown"
        },
        {
            title: "Multi Character Animation",
            dataIndex: "supportsMultiCharacterAnimation",
            width: 100,
            editableCellProps: { type: "checkbox" },
            render: (_, entity) => (entity.supportsMultiCharacterAnimation ? "Yes" : "No")
        },
        {
            title: "Apply On Character Editing",
            dataIndex: "applyOnCharacterEditing",
            width: 100,
            editableCellProps: { type: "checkbox" },
            render: (_, entity) => (entity.applyOnCharacterEditing ? "Yes" : "No")
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            width: 80,
            ...sortableColumnProps("sortOrder")
        }
    ];

    return (
        <EditableTable
            rowKey="id"
            onFinish={handleOnFinish}
            onChange={handleOnChange}
            scroll={{ x: 700 }}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
        />
    );
}
