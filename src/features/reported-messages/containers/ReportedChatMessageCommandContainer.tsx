import React from "react";
import { useDispatch } from "react-redux";

import { ChatMessageReport } from "../services";
import { ReportedMessageCommandTypes } from "../services/executeReportedChatMessageCommand";
import { ReportedChatMessageCommand } from "../components/ReportedChatMessageCommand";
import { executeReportMessageCommand } from "../store/actions";
import { useCurrentStage } from "shared";

export interface ReportedChatMessageCommandContainerProps {
    report: ChatMessageReport;
}

export function ReportedChatMessageCommandContainer({ report }: ReportedChatMessageCommandContainerProps) {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const handleExecute = (command: ReportedMessageCommandTypes, report: ChatMessageReport) =>
        dispatch(
            executeReportMessageCommand({
                command,
                report,
                stage
            })
        );

    return <ReportedChatMessageCommand report={report} onExecuteCommand={handleExecute} />;
}
