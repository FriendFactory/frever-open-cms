import { Action } from "redux";

import { Template } from "../../services";
import { AppState } from "app-state";
import { templateKeySelector } from "./templateEntitiesReducer";
import {
    templateActionGroup,
    templateLoadingAction,
    templateLoadedOkAction,
    templateLoadedErrorAction
} from "../actions";

export interface TemplateDetailsState {
    loading: boolean;
    error?: string;
    eventSoundURL?: string;
    data?: Template;
}

export const templateDetailsReducer = templateActionGroup.hashedReducer(
    (props) => templateKeySelector(props.stage, props.id),
    (state: TemplateDetailsState | undefined, action: Action): TemplateDetailsState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (templateLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (templateLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (templateLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                eventSoundURL: action.eventSoundURL ?? state.eventSoundURL
            };
        }

        return state;
    }
);

export const templatePageSelector = (stage: string, id: number): ((appState: AppState) => TemplateDetailsState) => {
    return (appState) => {
        const key = templateKeySelector(stage, id);

        const pageState = appState.template.details[key];
        const data = appState.template.entities[key];

        return {
            loading: pageState?.loading ?? false,
            error: pageState?.error,
            eventSoundURL: pageState?.eventSoundURL,
            data
        };
    };
};
