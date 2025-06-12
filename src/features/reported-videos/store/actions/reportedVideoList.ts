import { defineAction, defineActionGroup } from "rd-redux-utils";
import { ResultWithCount } from "shared";
import { GetReportedVideoListParams, ReportedVideoCommandTypes, ReportedVideoInfo } from "../../services";

export const reportVideoListActionGroup = defineActionGroup<{
    params: GetReportedVideoListParams;
    stage: string;
}>("REPORT VIDEO LIST");

export const reportVideoListLoadingAction = reportVideoListActionGroup.defineAction("LOADING");

export const reportVideoListLoadedOkAction = reportVideoListActionGroup.defineAction<{
    result: ResultWithCount<ReportedVideoInfo>;
}>("LOADED OK");

export const reportVideoListLoadedErrorAction = reportVideoListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const updateReportVideoListAction = defineAction<{
    stage: string;
    result: ReportedVideoInfo;
}>("REPORT VIDEO LIST UPDATE OK");

export const executeReportVideoCommandAction = defineAction<{
    stage: string;
    report: ReportedVideoInfo;
    command: ReportedVideoCommandTypes;
}>("REPORT VIDEO LIST EXECUTE COMMAND");
