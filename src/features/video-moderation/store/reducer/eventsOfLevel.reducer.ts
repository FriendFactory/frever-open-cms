import { Action } from "redux";

import { EventOfLevel } from "features/video-moderation/services";
import {
    eventsOfLevelActionGroup,
    eventsOfLevelLoadedErrorAction,
    eventsOfLevelLoadedOkAction,
    eventsOfLevelLoadingAction
} from "../actions";
import { AppState } from "app-state";

export interface EventsOfLevelState {
    loading: boolean;
    error?: string;
    data?: EventOfLevel[];
}
export const eventsOfLevelReducer = eventsOfLevelActionGroup.hashedReducer(
    (props) => eventsOfLevelStateKey(props.stage, props.levelId),
    (state: EventsOfLevelState | undefined, action: Action): EventsOfLevelState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (eventsOfLevelLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (eventsOfLevelLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (eventsOfLevelLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                data: action.result
            };
        }

        return state;
    }
);

export function eventsOfLevelStateKey(stage: string, id: number) {
    return `${stage}/${id}`;
}

const defaultState = {
    loading: false
};

export function eventsOfLevelSelector(
    stage: string,
    levelId?: number | null
): (appState: AppState) => EventsOfLevelState {
    return (appState) => {
        if (!levelId) {
            return defaultState;
        }
        const info = appState.eventsOfLevel[eventsOfLevelStateKey(stage, levelId)];

        return {
            loading: info?.loading ?? false,
            data: info?.data,
            error: info?.error
        };
    };
}
