import { Action } from "redux";
import qs from "query-string";

import {
    playlistsActionGroup,
    playlistsLoadedErrorAction,
    playlistsLoadedOkAction,
    playlistsLoadingAction
} from "../../actions";
import { PagingInfoSelectResult } from "shared";
import { Playlist, PlaylistsQueryParams } from "features/external-music/services";
import { DEFAULT_PLAYLISTS_PAGE_SIZE } from "urls";
import { AppState } from "app-state";

export interface PlaylistsState {
    error?: string;
    loading: boolean;
    pages: {
        [pageKey: string]: number[];
    };
}

export const playlistsStatusReducer = playlistsActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: PlaylistsState | undefined, action: Action): PlaylistsState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (playlistsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (playlistsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (playlistsLoadedOkAction.is(action)) {
            const page = action.result.map((el) => el.id);

            return {
                ...state,
                loading: false,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: page
                }
            };
        }

        return state;
    }
);

export interface PlaylistsPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: Playlist[];
    stage: string;
    params: PlaylistsQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export function playlistsPageSelector(
    stage: string,
    params: PlaylistsQueryParams
): (appState: AppState) => PlaylistsPageResult {
    return (appState) => {
        const playlistsState = appState.playlists.playlists[hashKeySelector(stage, params)];
        const page = playlistsState?.pages[pageKeySelector(params.skip)];

        const data = page?.map((playlistId) => appState.playlists.entities[playlistId]).filter(Boolean);

        return {
            loading: playlistsState?.loading,
            error: playlistsState?.error,
            data,
            stage,
            params,
            total: 5000,
            pageSize: DEFAULT_PLAYLISTS_PAGE_SIZE,
            currentPage: Math.floor((params.skip ?? 0) / DEFAULT_PLAYLISTS_PAGE_SIZE) + 1
        };
    };
}

function hashKeySelector(stage: string, params: PlaylistsQueryParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/playlists/${qs.stringify((keyParams as any) ?? {})}`;
}

export function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}
