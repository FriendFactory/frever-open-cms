import { Action } from "redux";

import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_PROMOTED_SONG_LIST_SIZE } from "urls";
import { hashKeySelector, pageKeySelector } from "utils";
import { promotedSongKeySelector } from "./promotedSongReducer";
import { PromotedSong, PromotedSongListQueryParams } from "../../services";
import {
    promotedSongListLoadingAction,
    promotedSongListLoadedOkAction,
    promotedSongListLoadedErrorAction,
    promotedSongListActionGroup
} from "../actions";

export interface PromotedSongListPageState {
    loading: boolean;
    error?: string;
    total?: number;
    pages?: { [pageKey: string]: string[] };
}

export const promotedSongListPageReducer = promotedSongListActionGroup.hashedReducer(
    ({ stage, params }) => hashKeySelector(stage, params),
    (state: PromotedSongListPageState | undefined, action: Action): PromotedSongListPageState => {
        if (!state) {
            state = { loading: false };
        }

        if (promotedSongListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (promotedSongListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (promotedSongListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((item) =>
                        promotedSongKeySelector(action.stage, item.id)
                    )
                }
            };
        }

        return state;
    }
);

export const promotedSongListPagerSelector =
    (stage: string, params: PromotedSongListQueryParams) =>
    (appState: AppState): PagingInfoSelectResult => {
        const status = appState.promotedSong.listPages[hashKeySelector(stage, params)];

        const pageSize = params.take || DEFAULT_PROMOTED_SONG_LIST_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;
        return {
            total: status?.total ?? 0,
            pageSize,
            currentPage
        };
    };

export interface PromotedSongListPageSelector {
    loading: boolean;
    error?: string;
    data?: PromotedSong[];
}

export const promotedSongListPageSelector =
    (stage: string, params: PromotedSongListQueryParams) =>
    (appState: AppState): PromotedSongListPageSelector => {
        const { pages, ...status } = appState.promotedSong.listPages[hashKeySelector(stage, params)] || {};
        const page = pages?.[pageKeySelector(params.skip)];

        const data = page?.map((el) => appState.promotedSong.entities[el]!).filter(Boolean);
        return {
            loading: status.loading ?? false,
            error: status.error,
            data
        };
    };
