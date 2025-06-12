import { AxiosResponse } from "axios";
import { request } from "shared";
import { ReportedVideoInfo } from "./getReportedVideoList";

export type ReportedVideoCommandTypes = "hidden" | "closed";

export const ReportedVideoCommandInfo: {
    [key in ReportedVideoCommandTypes]: {
        title: (entity: ReportedVideoInfo) => string;
        url: (entity: ReportedVideoInfo) => string;
    };
} = {
    hidden: {
        title: (entity) => (entity.report.hideVideo ? "Show video" : "Hide video"),
        url: (entity) =>
            `api/video-report/moderation/${entity.report.id}/${
                !entity.report.hideVideo ? "hide-video" : "unhide-video"
            }`
    },
    closed: {
        title: (entity) => (entity.report.closedTime ? "Reopen incident" : "Close incident"),
        url: (entity) =>
            `api/video-report/moderation/${entity.report.id}/${
                !entity.report.closedTime ? "close-incident" : "reopen-incident"
            }`
    }
};

export async function executeReportedVideoCommand(
    stage: string,
    report: ReportedVideoInfo,
    command: ReportedVideoCommandTypes
): Promise<ReportedVideoInfo> {
    const url = ReportedVideoCommandInfo[command].url(report);

    const response = await request(stage).assetmanager().post<{}, AxiosResponse<ReportedVideoInfo>>(url);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
