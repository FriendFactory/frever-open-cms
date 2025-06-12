import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { hashKeySelector, pageKeySelector } from "utils";
import { createListPageHashedReducer } from "shared/store";
import { DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE } from "urls";
import {
    videoLeadListActionGroup,
    videoLeadListLoadedErrorAction,
    videoLeadListLoadedOkAction,
    videoLeadListLoadingAction
} from "../actions/actions";
import { videoLeaderboardKeySelector } from "./entitiesReducer";
import { VideoLeaderboardQueryParams, LeaderboardVideo } from "features/video-leaderboard/services";

export const listReducer = createListPageHashedReducer({
    group: videoLeadListActionGroup,
    loading: videoLeadListLoadingAction,
    loadedOk: videoLeadListLoadedOkAction,
    loadedError: videoLeadListLoadedErrorAction,
    keyFactory: (stage, data) => videoLeaderboardKeySelector(stage, data.id)
});

export interface VideoLeaderboardPageSelectorType extends PagingInfoSelectResult {
    stage: string;
    data?: LeaderboardVideo[];
    params: VideoLeaderboardQueryParams;
    loading: boolean;
    error?: string;
}

export const videoLeaderboardListPageSelector =
    (stage: string, params: VideoLeaderboardQueryParams) =>
    (appState: AppState): VideoLeaderboardPageSelectorType => {
        const result = appState.videoLeaderboard.listPages[hashKeySelector(stage, params)];
        const data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.videoLeaderboard?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            error: result?.error,
            loading: result?.loading ?? false,
            total: result?.total ?? 0,
            data,
            stage,
            params,
            pageSize,
            currentPage
        };
    };
