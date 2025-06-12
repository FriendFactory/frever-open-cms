import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { ProtectedLink } from "shared";
import { USER_DETAILS_INFO_URL } from "urls";
import { DeviceBlacklistEntity, DeviceBlacklistQueryParams } from "../services";
import { deviceBlacklistListSelector } from "../store/reducer";
import { AddDeviceToBlacklistContainer } from "./AddDeviceToBlacklistContainer";
import { DeleteDeviceFromBlacklistContainer } from "./DeleteDeviceFromBlacklistContainer";

interface DeviceBlacklistListContainerProps {
    stage: string;
    params: DeviceBlacklistQueryParams;
}

export function DeviceBlacklistListContainer({ stage, params }: DeviceBlacklistListContainerProps) {
    const info = useSelector(deviceBlacklistListSelector(stage, params));

    const columns: ColumnsType<DeviceBlacklistEntity> = [
        {
            title: "Device ID",
            dataIndex: "deviceId",
            width: 150
        },
        {
            title: "Blocked By",
            dataIndex: "blockedByGroupId",
            width: 100,
            render: (_, record) => (
                <ProtectedLink
                    feature="Social"
                    to={USER_DETAILS_INFO_URL.format({ stage, selector: "mainGroupId", id: record.blockedByGroupId })}>
                    {record.blockedByGroupName}
                </ProtectedLink>
            )
        },
        {
            title: "Blocked At",
            dataIndex: "blockedAt",
            width: 100,
            render: (_, record) => dayjs.utc(record.blockedAt).format("DD MMM YYYY HH:mm")
        },
        {
            title: "Reason",
            dataIndex: "reason",
            width: 200
        },
        {
            title: <AddDeviceToBlacklistContainer />,
            fixed: "right",
            align: "right",
            width: 65,
            render: (_, record) => <DeleteDeviceFromBlacklistContainer deviceId={record.deviceId} />
        }
    ];

    return (
        <Table
            rowKey="deviceId"
            scroll={{ x: 700 }}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
        />
    );
}
