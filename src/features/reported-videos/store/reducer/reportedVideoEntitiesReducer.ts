import { Action } from "redux";

import { ReportedVideoInfo } from "features/reported-videos/services";
import { reportVideoListLoadedOkAction, updateReportVideoListAction } from "../actions";

export interface ReportVideoEntitiesState {
    [x: string]: ReportedVideoInfo | undefined;
}

export const reportedVideoEntitiesReducer = (
    state: ReportVideoEntitiesState | undefined,
    action: Action
): ReportVideoEntitiesState => {
    if (!state) {
        state = {};
    }

    if (reportVideoListLoadedOkAction.is(action)) {
        return action.result.data.reduce<ReportVideoEntitiesState>(
            (acc, el) => {
                acc[reportedVideoKeySelector(action.stage, el.report.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    if (updateReportVideoListAction.is(action)) {
        const key = reportedVideoKeySelector(action.stage, action.result.report.id);

        const updatedEntity = { ...state[key], ...action.result };

        return {
            ...state,
            [key]: updatedEntity
        };
    }

    return state;
};

export const reportedVideoKeySelector = (stage: string, id: number) => `${stage}/reported-video/${id}`;
