import { Action } from "redux";

import { AppState } from "app-state";

import {
    levelDetailsActionGroup,
    levelDetailsLoadingAction,
    levelDetailsLoadedOkAction,
    levelDetailsLoadedErrorAction
} from "../actions";
import { levelKeySelector } from "./level.reducer";
import { Level } from "features/level-moderation/services";

export interface LevelDetails {
    loading: boolean;
    error?: string;
}

export const levelDetailsReducer = levelDetailsActionGroup.hashedReducer(
    (props) => levelKeySelector(props.stage, props.id),
    (state: LevelDetails | undefined, action: Action): LevelDetails => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (levelDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (levelDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (levelDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export interface LevelDetailsPageResult {
    error?: string;
    loading: boolean;
    data?: Level;
}

export function levelDetailsPageSelector(stage: string, id: number): (appState: AppState) => LevelDetailsPageResult {
    return (appState) => {
        const detailsPage = appState.level.detailsPage[levelKeySelector(stage, id)];
        const levelData = appState.level.entities?.[levelKeySelector(stage, id)];

        let data: Level | undefined;

        if (levelData) {
            const { eventById, ...level } = levelData;

            const event = eventById?.map((el) => appState.event.entities[el]);

            data = { ...level, event };
        }

        return {
            loading: detailsPage?.loading ?? false,
            error: detailsPage?.error,
            data
        };
    };
}
