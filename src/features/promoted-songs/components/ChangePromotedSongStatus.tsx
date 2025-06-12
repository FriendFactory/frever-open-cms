import React from "react";
import { Button, Popconfirm } from "antd";
import { RedoOutlined, StopOutlined } from "@ant-design/icons";

interface ChangePromotedSongStatusProps {
    isEnabled: boolean;
    onChange: () => void;
}

export function ChangePromotedSongStatus({ isEnabled, onChange }: ChangePromotedSongStatusProps) {
    return (
        <Popconfirm
            title="Confirm your action"
            okText="Confirm"
            okType={isEnabled ? "danger" : "primary"}
            onConfirm={onChange}>
            <Button type="primary" ghost danger={isEnabled} icon={isEnabled ? <StopOutlined /> : <RedoOutlined />} />
        </Popconfirm>
    );
}
