import { Action } from "redux";

import { AppState } from "app-state";
import {
    questTypeListActionGroup,
    questTypeListLoadedErrorAction,
    questTypeListLoadedOkAction,
    questTypeListLoadingAction
} from "../actions";
import { hashKeySelector } from "utils";

export interface QuestTypeListState {
    loading: boolean;
    error?: string;
    data?: string[];
}

export const onboardingQuestTypeReducer = questTypeListActionGroup.hashedReducer(
    ({ stage }) => hashKeySelector(stage),
    (state: QuestTypeListState | undefined, action: Action): QuestTypeListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (questTypeListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (questTypeListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (questTypeListLoadedOkAction.is(action)) {
            return {
                loading: false,
                error: undefined,
                data: action.data
            };
        }

        return state;
    }
);

export interface OnboardingQuestTypePageResult {
    error?: string;
    loading: boolean;
    stage: string;
    data?: string[];
}

export function onboardingQuestTypePageSelector(stage: string): (appState: AppState) => OnboardingQuestTypePageResult {
    return ({ onboarding }) => {
        const pageState = onboarding.questType[hashKeySelector(stage)];

        const data = pageState?.data;

        return {
            error: pageState?.error,
            loading: pageState?.loading ?? false,
            data,
            stage
        };
    };
}
