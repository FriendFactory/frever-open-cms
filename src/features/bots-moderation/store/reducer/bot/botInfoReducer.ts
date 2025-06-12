import { Action } from "redux";

import {
    botInfoActionGroup,
    botInfoLoadingAction,
    botInfoLoadedOkAction,
    botInfoLoadedErrorAction
} from "../../actions";
import { NormalizedBot, botKeySelector } from "./botEntitiesReducer";
import { AppState } from "app-state";

export interface BotInfoState {
    loading: boolean;
    error?: string;
    data?: NormalizedBot;
}

export const botInfoReducer = botInfoActionGroup.hashedReducer(
    (props) => botKeySelector(props.stage, props.id),
    (state: BotInfoState | undefined, action: Action): BotInfoState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (botInfoLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (botInfoLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (botInfoLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined
            };
        }

        return state;
    }
);

export const botInfoPageSelector =
    (stage: string, id: number) =>
    (appState: AppState): BotInfoState => {
        const detailsPage = appState.bots.infoPage[botKeySelector(stage, id)];
        const data = appState.bots.entities?.[botKeySelector(stage, id)];

        return {
            loading: detailsPage?.loading ?? false,
            error: detailsPage?.error,
            data
        };
    };
