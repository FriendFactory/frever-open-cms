import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { ReportedVideoCommand } from "../components/ReportedVideoCommand";
import { ReportedVideoInfo } from "../services";
import { ReportedVideoCommandTypes } from "../services/executeReportedVideoCommand";
import { executeReportVideoCommandAction } from "../store/actions";
import { REPORTED_VIDEO_BASE_URL } from "urls";

export interface ReportedVideoCommandContainerProps {
    report: ReportedVideoInfo;
}

export function ReportedVideoCommandContainer({ report }: ReportedVideoCommandContainerProps) {
    const location = useLocation();
    const urlMatch = REPORTED_VIDEO_BASE_URL.match(location, false);
    const dispatch = useDispatch();
    const handleExecute = useCallback(
        (command: ReportedVideoCommandTypes, reportedVideo: ReportedVideoInfo) => {
            if (urlMatch.isMatched) {
                dispatch(
                    executeReportVideoCommandAction({
                        command,
                        report: reportedVideo,
                        stage: urlMatch.params.stage
                    })
                );
            }
        },
        [dispatch, urlMatch.isMatched ? urlMatch.params.stage : ""]
    );

    return <ReportedVideoCommand report={report} onExecuteCommand={handleExecute} />;
}
