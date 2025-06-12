import { Action } from "redux";
import qs from "query-string";

import {
    TracksSearchQueryParams,
    TracksSearchResult,
    TracksSearchResultEntity
} from "features/external-music/services/getTracks";
import {
    tracksSearchActionGroup,
    tracksSearchLoadingAction,
    tracksSearchLoadedOkAction,
    tracksSearchLoadedErrorAction
} from "../actions";
import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";

export interface TrackSearchState extends Partial<TracksSearchResult> {
    loading: boolean;
    error?: string;
}

export const trackSearchReducer = tracksSearchActionGroup.hashedReducer(
    (props) => hashKeySelector(props.params),
    (state: TrackSearchState | undefined, action: Action): TrackSearchState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (tracksSearchLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (tracksSearchLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (tracksSearchLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                ...action.result
            };
        }

        return state;
    }
);

export interface TrackSearchPageSelectorResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: TracksSearchResultEntity[];
}

export function trackSearchPageSelector(
    params: Partial<TracksSearchQueryParams>
): (appState: AppState) => TrackSearchPageSelectorResult {
    return (appState) => {
        const { loading, error, totalItems, page, pageSize, searchResult } =
            appState.tracksSearch[hashKeySelector(params)] || {};

        return {
            loading,
            error,
            total: totalItems ?? 0,
            pageSize: pageSize ?? 0,
            currentPage: page ?? 1,
            data: searchResult
        };
    };
}

const hashKeySelector = (params: Partial<TracksSearchQueryParams>) =>
    `tracks-search/${qs.stringify((params as any) ?? {})}`;
