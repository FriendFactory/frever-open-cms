import { Action } from "redux";

import {
    reportVideoListActionGroup,
    reportVideoListLoadingAction,
    reportVideoListLoadedOkAction,
    reportVideoListLoadedErrorAction
} from "../actions";
import { AppState } from "app-state";
import { DEFAULT_REPORTED_VIDEO_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { hashKeySelector, pageKeySelector } from "utils";
import { reportedVideoKeySelector } from "./reportedVideoEntitiesReducer";
import { GetReportedVideoListParams, ReportedVideoInfo } from "features/reported-videos/services";

export interface ReportVideoListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const reportedVideoListReducer = reportVideoListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: ReportVideoListState | undefined, action: Action): ReportVideoListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (reportVideoListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (reportVideoListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (reportVideoListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        reportedVideoKeySelector(action.stage, el.report.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface ReportedVideoLisPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: ReportedVideoInfo[];
    total: number;
}

export function reportedVideoListSelector(
    stage: string,
    params: GetReportedVideoListParams
): (appState: AppState) => ReportedVideoLisPageResult {
    return (appState) => {
        const state = appState.reportedVideos.list[hashKeySelector(stage, params)];

        const data = state?.pages?.[pageKeySelector(params.skip)]
            ?.map((el) => appState.reportedVideos.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_REPORTED_VIDEO_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            total: state?.total ?? 0,
            data,
            currentPage,
            pageSize
        };
    };
}
