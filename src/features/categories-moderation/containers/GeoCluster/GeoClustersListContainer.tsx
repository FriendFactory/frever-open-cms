import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Badge, Button, Popconfirm, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";

import { GEO_CLUSTERS_LIST_URL, GEO_CLUSTER_DETAILS_URL } from "urls";
import { GeoCluster, GeoClustersListQueryParams } from "../../services";
import { geoClustersListPageSelector } from "../../store/reducer";
import { CreateGeoClusterModalContainer } from "./CreateGeoClusterModalContainer";
import { useDispatch } from "react-redux";
import { executeUpdateGeoClusterAction } from "features/categories-moderation/store/actions";
import { StopOutlined, UndoOutlined } from "@ant-design/icons";
import { createSortableColumnProps } from "shared";

interface GeoClustersListContainerProps {
    stage: string;
    params?: GeoClustersListQueryParams;
}

export function GeoClustersListContainer({ stage, params }: GeoClustersListContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const info = useSelector(geoClustersListPageSelector(stage, params || {}, true));

    const handleOnRow = (record: GeoCluster) => ({
        onClick: () => history.push(GEO_CLUSTER_DETAILS_URL.format({ stage, id: record.id }))
    });

    const handleOnChangeStatus = (record: GeoCluster) =>
        dispatch(executeUpdateGeoClusterAction({ stage, id: record.id, data: { isActive: !record.isActive } }));

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<GeoCluster>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: GeoClustersListQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as GeoClustersListQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = GEO_CLUSTERS_LIST_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const columns: ColumnsType<GeoCluster> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
            ...sortableColumnProps("id")
        },
        {
            title: "Title",
            dataIndex: "title",
            width: 240,
            ...sortableColumnProps("title")
        },
        {
            title: "Priority",
            dataIndex: "priority",
            width: 100,
            ...sortableColumnProps("priority")
        },
        {
            title: "Is Active",
            width: 100,
            render: (_, record) => (
                <Badge color={record.isActive ? "blue" : "red"} text={record.isActive ? "Active" : "Inactive"} />
            )
        },
        {
            title: <CreateGeoClusterModalContainer />,
            width: 64,
            align: "right",
            fixed: "right",
            render: (_, record) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Popconfirm
                        title="Please, confirm the status changing"
                        okType={record.isActive ? "danger" : "primary"}
                        okText={record.isActive ? "Set Inactive" : "Set Active"}
                        onConfirm={() => handleOnChangeStatus(record)}>
                        <Button
                            danger={record.isActive}
                            type="primary"
                            ghost
                            icon={record.isActive ? <StopOutlined /> : <UndoOutlined />}
                        />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <Table
            rowKey="id"
            loading={info.loading}
            onChange={handleOnChange}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            scroll={{ x: 600 }}
            onRow={handleOnRow}
        />
    );
}
