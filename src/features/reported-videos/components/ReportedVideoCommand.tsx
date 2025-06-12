import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

import { ReportedVideoCommandInfo, ReportedVideoCommandTypes } from "../services/executeReportedVideoCommand";
import { ReportedVideoInfo } from "../services/getReportedVideoList";
import { ItemType } from "antd/es/menu/hooks/useItems";

export interface ReportedVideoCommandProps {
    report: ReportedVideoInfo;
    onExecuteCommand: (command: ReportedVideoCommandTypes, reportedVideo: ReportedVideoInfo) => void;
}

export function ReportedVideoCommand({ report, onExecuteCommand }: ReportedVideoCommandProps) {
    const items: ItemType[] = Object.entries(ReportedVideoCommandInfo).map(([key, value]) => ({
        key,
        label: value.title(report),
        onClick: () => onExecuteCommand(key as ReportedVideoCommandTypes, report)
    }));

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
}
