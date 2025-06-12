import React from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";

import { ChatMessageReport } from "../services";
import { ReportedMessageCommandInfo, ReportedMessageCommandTypes } from "../services/executeReportedChatMessageCommand";

export interface ReportedChatMessageCommandProps {
    report: ChatMessageReport;
    onExecuteCommand: (command: ReportedMessageCommandTypes, reportedVideo: ChatMessageReport) => void;
}

export function ReportedChatMessageCommand({ report, onExecuteCommand }: ReportedChatMessageCommandProps) {
    const items: ItemType[] = Object.entries(ReportedMessageCommandInfo).map(([key, value]) => ({
        key,
        label: value.title(report),
        onClick: () => onExecuteCommand(key as ReportedMessageCommandTypes, report)
    }));

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
}
