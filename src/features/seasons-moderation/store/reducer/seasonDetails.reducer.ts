import { Action } from "redux";

import { Season } from "features/seasons-moderation/services";
import { seasonKeySelector } from "./season.reducer";
import { AppState } from "app-state";
import {
    seasonDetailsActionGroup,
    seasonDetailsLoadingAction,
    seasonDetailsLoadedOkAction,
    seasonDetailsLoadedErrorAction
} from "../actions";

export interface SeasonDetailsPageState {
    loading: boolean;
    error?: string;
    data?: Season;
}

export const seasonDetailsPageReducer = seasonDetailsActionGroup.hashedReducer(
    ({ stage, id }) => seasonKeySelector(stage, id),
    (state: SeasonDetailsPageState | undefined, action: Action): SeasonDetailsPageState => {
        if (!state) {
            state = { loading: false };
        }

        if (seasonDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (seasonDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (seasonDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false
            };
        }

        return state;
    }
);

export function seasonDetailsPageSelector(stage: string, id: number): (appState: AppState) => SeasonDetailsPageState {
    return (appState) => {
        const pageStatus = appState.season.detailsPages[seasonKeySelector(stage, id)];
        const data = appState.season.entities[seasonKeySelector(stage, id)];
        return {
            loading: pageStatus?.loading ?? false,
            error: pageStatus?.error,
            data
        };
    };
}
