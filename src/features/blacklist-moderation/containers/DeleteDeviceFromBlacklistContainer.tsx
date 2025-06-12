import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { deleteDeviceFromBlacklistAction } from "../store/actions/deviceBlacklist";
import { useCurrentStage } from "shared";

interface DeleteDeviceFromBlacklistContainerProps {
    deviceId: string;
}

export function DeleteDeviceFromBlacklistContainer({ deviceId }: DeleteDeviceFromBlacklistContainerProps) {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const handleOnDelete = () => dispatch(deleteDeviceFromBlacklistAction({ stage, deviceId }));

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Popconfirm
                title={`Delete this device from the blacklist?`}
                onConfirm={handleOnDelete}
                placement="left"
                okText="Confirm"
                okType="danger">
                <Button danger ghost icon={<DeleteOutlined />} />
            </Popconfirm>
        </div>
    );
}
