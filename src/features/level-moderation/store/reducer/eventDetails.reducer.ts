import { Action } from "redux";

import { AppState } from "app-state";

import { LevelEvent } from "features/level-moderation/services";
import {
    eventDetailsActionGroup,
    eventDetailsLoadingAction,
    eventDetailsLoadedOkAction,
    eventDetailsLoadedErrorAction
} from "../actions";
import { eventKeySelector } from "./event.reducer";

export interface EventDetails {
    loading: boolean;
    error?: string;
}

export const eventDetailsReducer = eventDetailsActionGroup.hashedReducer(
    (props) => eventKeySelector(props.stage, props.id),
    (state: EventDetails | undefined, action: Action): EventDetails => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (eventDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (eventDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (eventDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export interface EventDetailsPageResult {
    loading: boolean;
    error?: string;
    data?: LevelEvent;
}

export function eventDetailsPageSelector(stage: string, id: number): (appState: AppState) => EventDetailsPageResult {
    return (appState) => {
        const detailsPage = appState.event.detailsPage[eventKeySelector(stage, id)];
        const data = appState.event.entities?.[eventKeySelector(stage, id)];

        return {
            loading: detailsPage?.loading ?? false,
            error: detailsPage?.error,
            data
        };
    };
}
