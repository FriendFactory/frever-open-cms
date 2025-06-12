import { Action } from "redux";
import qs from "query-string";

import { PagingInfoSelectResult } from "shared";
import { DEFAULT_COMMENT_PAGE_SIZE } from "urls";
import { AppState } from "app-state";
import { commentKeySelector } from "./entitiesReducer";
import { VideoComment, VideoCommentsQueryParams } from "../../services";
import {
    videoCommentsActionGroup,
    videoCommentsLoadingAction,
    videoCommentsLoadedErrorAction,
    videoCommentsLoadedOkAction
} from "../actions";

export interface VideoCommentsState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const videoCommentListPageReducer = videoCommentsActionGroup.hashedReducer(
    (action) => videoCommentsHashKeySelector(action.stage, action.params),
    (state: VideoCommentsState | undefined, action: Action): VideoCommentsState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (videoCommentsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (videoCommentsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (videoCommentsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        commentKeySelector(action.stage, el.videoId, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface VideoCommentsPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: VideoComment[];
    stage: string;
    params: VideoCommentsQueryParams;
}

export function videoCommentsPageSelector(
    stage: string,
    params: VideoCommentsQueryParams
): (appState: AppState) => VideoCommentsPageResult {
    return (appState) => {
        const videoComments = appState.videoComments.listPages[videoCommentsHashKeySelector(stage, params)];
        const page = videoComments?.pages[pageKeySelector(params.skip)];
        const data = page?.map((el) => appState.videoComments.entities[el]).filter(Boolean) as VideoComment[];
        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_COMMENT_PAGE_SIZE) + 1;

        return {
            loading: videoComments?.loading ?? false,
            data,
            params,
            total: videoComments?.total ?? 0,
            stage,
            error: videoComments?.error,
            pageSize: DEFAULT_COMMENT_PAGE_SIZE,
            currentPage
        };
    };
}

export function videoCommentsPagerSelector(
    stage: string,
    params: VideoCommentsQueryParams
): (appState: AppState) => PagingInfoSelectResult {
    return (appState) => {
        const videoComments = appState.videoComments.listPages[videoCommentsHashKeySelector(stage, params)];
        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_COMMENT_PAGE_SIZE) + 1;

        return {
            total: videoComments?.total ?? 0,
            pageSize: DEFAULT_COMMENT_PAGE_SIZE,
            currentPage
        };
    };
}

export const pageKeySelector = (skip: number | undefined) => `skip = ${skip ?? 0}`;

export const videoCommentsHashKeySelector = (stage: string, { skip, ...keyParams }: VideoCommentsQueryParams = {}) =>
    `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
