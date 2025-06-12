import React from "react";
import { Avatar, Table } from "antd";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { useHistory } from "react-router";

import { universeListPageSelector } from "../store/reducer";
import { Universe, UniverseListQueryParams } from "../services";
import { ReadinessTag } from "shared/components/ReadinessTag";
import { createCdnURLFromFiles } from "shared";
import { UNIVERSE_DETAILS_URL } from "urls";

interface UniverseListContainerProps {
    stage: string;
    params: UniverseListQueryParams;
}

export function UniverseListContainer({ stage, params }: UniverseListContainerProps) {
    const history = useHistory();
    const info = useSelector(universeListPageSelector(stage, params));

    const onRow = (universe: Universe) => ({
        onClick: () => history.push(UNIVERSE_DETAILS_URL.format({ stage, id: universe.id }))
    });

    const columns: ColumnsType<Universe> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 100
        },
        {
            title: "Thumbnail",
            width: 100,
            render: (_: unknown, entity) => (
                <Avatar
                    shape="square"
                    size={65}
                    src={
                        entity.files.length
                            ? createCdnURLFromFiles({
                                  stage,
                                  id: entity.id,
                                  files: entity.files,
                                  entityType: "Universe",
                                  resolution: "64x64"
                              })
                            : ""
                    }
                />
            )
        },
        {
            title: "Is New",
            dataIndex: "isNew",
            width: 100,
            render: (_, entity) => (entity.isNew ? "Yes" : "No")
        },
        {
            title: "Allow Start Gift",
            dataIndex: "allowStartGift",
            width: 100,
            render: (_, entity) => (entity.allowStartGift ? "Yes" : "No")
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            width: 100
        },
        {
            title: "Readiness",
            width: 120,
            render: (_, entity) => <ReadinessTag stage={stage} readinessId={entity.readinessId} />
        }
    ];

    return (
        <Table
            onRow={onRow}
            rowKey="id"
            scroll={{ x: 700 }}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
        />
    );
}
