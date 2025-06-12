import { AxiosResponse } from "axios";

import { request } from "shared";
import { ChatMessageReport } from "./api";

export type ReportedMessageCommandTypes = "hidden" | "closed";

export const ReportedMessageCommandInfo: {
    [key in ReportedMessageCommandTypes]: {
        title: (report: ChatMessageReport) => string;
        url: (report: ChatMessageReport) => string;
    };
} = {
    hidden: {
        title: (report) => (report.hideMessage ? "Show Message" : "Hide Message"),
        url: (report) => `api/chat/moderation/report/${report.id}/hidden/${!report.hideMessage}`
    },
    closed: {
        title: (report) => (report.closedTime ? "Reopen incident" : "Close incident"),
        url: (report) => `api/chat/moderation/report/${report.id}/closed/${!report.closedTime}`
    }
};

export async function executeReportedChatMessageCommand(
    stage: string,
    report: ChatMessageReport,
    command: ReportedMessageCommandTypes
): Promise<undefined> {
    const url = ReportedMessageCommandInfo[command].url(report);

    const response = await request(stage).assetmanager().post<{}, AxiosResponse<ChatMessageReport>>(url);
    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}.`);
}
