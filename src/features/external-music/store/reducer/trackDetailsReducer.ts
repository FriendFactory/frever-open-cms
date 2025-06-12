import { Action } from "redux";
import qs from "query-string";

import {
    trackDetailsActionGroup,
    trackDetailsLoadingAction,
    trackDetailsLoadedOkAction,
    trackDetailsLoadedErrorAction
} from "../actions";
import { AppState } from "app-state";
import { TrackDetailsQueryParams, TrackDetailsResult } from "features/external-music/services/getTrackDetails";
import { TracksSearchResultEntityTrack } from "features/external-music/services";

interface TrackDetailsState extends Partial<TrackDetailsResult> {
    loading: boolean;
    error?: string;
}

export const trackDetailsReducer = trackDetailsActionGroup.hashedReducer(
    (props) => hashKeySelector(props.params),
    (state: TrackDetailsState | undefined, action: Action): TrackDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (trackDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (trackDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (trackDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                ...action.result
            };
        }

        return state;
    }
);

export interface TrackDetailsPageSelectorResult {
    loading: boolean;
    error?: string;
    data?: TracksSearchResultEntityTrack;
}

export function trackDetailsPageSelector(
    params: Partial<TrackDetailsQueryParams>
): (appState: AppState) => TrackDetailsPageSelectorResult {
    return (appState) => {
        const { loading, error, track } = appState.trackDetails[hashKeySelector(params)] || {};

        return {
            loading,
            error,
            data: track
        };
    };
}

const hashKeySelector = (params: Partial<TrackDetailsQueryParams>) =>
    `track-details/${qs.stringify((params as any) ?? {})}`;
