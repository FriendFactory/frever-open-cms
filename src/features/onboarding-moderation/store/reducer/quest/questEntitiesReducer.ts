import { Action } from "redux";

import { questListLoadedOkAction } from "../../actions";
import { OnboardingQuest } from "features/onboarding-moderation/services";

export interface QuestEntitiesState {
    [x: string]: OnboardingQuest | undefined;
}

export const questEntitiesReducer = (state: QuestEntitiesState | undefined, action: Action): QuestEntitiesState => {
    if (!state) {
        state = {};
    }

    if (questListLoadedOkAction.is(action)) {
        return action.result.data.reduce<QuestEntitiesState>(
            (acc, el) => {
                acc[questKeySelector(action.stage, el.id)] = el;
                return acc;
            },
            { ...state }
        );
    }

    return state;
};

export const questKeySelector = (stage: string, id: number) => `${stage}/onboarding-quest/${id}`;
