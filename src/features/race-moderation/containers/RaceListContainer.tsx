import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { useHistory } from "react-router";

import { useIntellectualPropertySearch } from "features/intellectual-property";
import { INTELLECTUAL_PROPERTY_DETAILS_URL, RACE_DETAILS_URL } from "urls";
import { ReadinessTag } from "shared/components/ReadinessTag";
import { ProtectedLink } from "shared";
import { raceListPageSelector } from "../store/reducer";
import { Race, RaceListQueryParams } from "../services";

interface RaceListContainerProps {
    stage: string;
    params: RaceListQueryParams;
}

export function RaceListContainer({ stage, params }: RaceListContainerProps) {
    const history = useHistory();
    const info = useSelector(raceListPageSelector(stage, params));
    const infoIP = useIntellectualPropertySearch({ stage });

    const onRow = (universe: Race) => ({
        onClick: () => history.push(RACE_DETAILS_URL.format({ stage, id: universe.id }))
    });

    const columns: ColumnsType<Race> = [
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
            title: "Intellectual Property",
            dataIndex: "intellectualPropertyId",
            width: 100,
            render: (_, entity) =>
                entity.intellectualPropertyId ? (
                    <ProtectedLink
                        onClick={(e) => e.stopPropagation()}
                        feature="CategoriesFull"
                        to={INTELLECTUAL_PROPERTY_DETAILS_URL.format({ stage, id: entity.intellectualPropertyId })}>
                        {
                            infoIP.info?.data?.find(
                                (intellectualProperty) => intellectualProperty.id === entity.intellectualPropertyId
                            )?.name
                        }
                    </ProtectedLink>
                ) : (
                    ""
                )
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
