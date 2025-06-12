import * as qs from "query-string";
import { Action } from "redux";

import { DEFAULT_VIDEO_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { GetVideoListParams, Video } from "../../../services";
import {
    videoModerationListActionGroup,
    videoModerationListLoadedErrorAction,
    videoModerationListLoadedOkAction,
    videoModerationListLoadingAction
} from "../../actions/videoList";
import { videoInfoKeySelector } from "./videoEntitiesReducer";

export interface VideoModerationListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[] | undefined;
    };
}

export const videoModerationListReducer = videoModerationListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: VideoModerationListState | undefined, action: Action): VideoModerationListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (videoModerationListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (videoModerationListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (videoModerationListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        videoInfoKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface VideoModerationListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: Video[];
    stage: string;
    params: GetVideoListParams;
}

export function videoModerationListPageSelector(
    stage: string,
    params: GetVideoListParams
): (appState: AppState) => VideoModerationListPageResult {
    return (appState) => {
        const videoState = appState.videoModeration.listPage[hashKeySelector(stage, params)];

        const page = videoState?.pages[pageKeySelector(params.skip)]
            ?.map((el) => appState.videoModeration.entities[el]?.video!)
            .filter(Boolean);

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_VIDEO_PAGE_SIZE) + 1;

        return {
            loading: videoState?.loading ?? false,
            data: page ?? [],
            params,
            total: videoState?.total ?? 0,
            stage,
            error: videoState?.error,
            pageSize: DEFAULT_VIDEO_PAGE_SIZE,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: GetVideoListParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}
